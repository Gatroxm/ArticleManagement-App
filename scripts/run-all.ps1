# PowerShell script to install deps, run dev server and tests for ArticleManagement-App
# Usage: Open PowerShell (Windows), navigate to repo root and run: .\scripts\run-all.ps1
# Note: This script is Windows/PowerShell specific. On macOS/Linux use the manual steps in README.md

function ExitWithError([string]$msg){
  Write-Host "ERROR: $msg" -ForegroundColor Red
  exit 1
}

Write-Host "Checking Node and npm availability..."
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { ExitWithError "Node.js is not installed or not on PATH. Install Node >= 18." }
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { ExitWithError "npm is not installed or not on PATH." }

# Install dependencies (prefer CI if lockfile present)
if (Test-Path "package-lock.json") {
  Write-Host "Found package-lock.json — running npm ci..."
  npm ci || ExitWithError "npm ci failed"
} else {
  Write-Host "Running npm install..."
  npm install || ExitWithError "npm install failed"
}

# Start dev server in new PowerShell window so tests can run in parallel
Write-Host "Starting Vite dev server in a new window..."
Start-Process pwsh -ArgumentList "-NoExit","-Command","npm run dev" -WindowStyle Normal

# Give dev server a moment to start (optional)
Start-Sleep -Seconds 2

# Run tests
Write-Host "Running tests (Jest)..."
npm run test || ExitWithError "Tests failed"

Write-Host "All steps done. To run Cypress interactively, ensure the dev server is running and execute: npm run cypress"
Write-Host "To run Cypress headless: npm run cypress:run"
