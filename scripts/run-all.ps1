# PowerShell script to install deps, run dev server and tests for ArticleManagement-App
# Usage: Open PowerShell, navigate to repo root and run: .\scripts\run-all.ps1

Write-Host "Installing dependencies..."
npm install

Write-Host "Starting Vite dev server in a new window..."
Start-Process powershell -ArgumentList "-NoExit","-Command","npm run dev"

Write-Host "Running tests (Jest)..."
npm run test

Write-Host "To run Cypress interactively: npm run cypress"
