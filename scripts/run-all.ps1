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
  npm ci
  if ($LASTEXITCODE -ne 0) {
    Write-Host "npm ci failed; attempting npm install as fallback..."
    npm install --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { ExitWithError "Both npm ci and npm install failed" }
  }
} else {
  Write-Host "Running npm install..."
  npm install
  if ($LASTEXITCODE -ne 0) { ExitWithError "npm install failed" }
}

# Start dev server in new PowerShell window so tests can run in parallel
Write-Host "Starting Vite dev server in a new window..."
# Try to open dev server in a new terminal: prefer pwsh, then powershell.exe, otherwise fallback to cmd start
$pwshCmd = Get-Command pwsh -ErrorAction SilentlyContinue
$powershellCmd = Get-Command powershell.exe -ErrorAction SilentlyContinue
if ($pwshCmd) {
  Start-Process -FilePath $pwshCmd.Source -ArgumentList "-NoExit","-Command","npm run dev" -WindowStyle Normal
} elseif ($powershellCmd) {
  Start-Process -FilePath $powershellCmd.Source -ArgumentList "-NoExit","-Command","npm run dev" -WindowStyle Normal
} else {
  Write-Host "Neither pwsh nor powershell.exe found; falling back to cmd start"
  Start-Process -FilePath "cmd.exe" -ArgumentList "/c","start","npm run dev" -WindowStyle Normal
}

# Give dev server a moment to start (optional)
Start-Sleep -Seconds 2

# Run tests
Write-Host "Running tests (Jest)..."
npm run test
if ($LASTEXITCODE -ne 0) { ExitWithError "Tests failed" }

Write-Host "All steps done. To run Cypress interactively, ensure the dev server is running and execute: npm run cypress"
Write-Host "To run Cypress headless: npm run cypress:run"
