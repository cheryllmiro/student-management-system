Write-Host "Checking required files..." -ForegroundColor Yellow
 = @(
    "resources/js/app.js",
    "resources/js/bootstrap.js",
    "resources/js/router/index.js",
    "resources/js/stores/studentStore.js",
    "resources/js/components/App.vue",
    "resources/js/components/students/StudentList.vue",
    "resources/js/components/students/StudentForm.vue",
    "resources/js/components/students/DeletedStudents.vue",
    "vite.config.js",
    "package.json"
)

 = @()

foreach ( in ) {
    if (Test-Path ) {
        Write-Host "✓ " -ForegroundColor Green
    } else {
        Write-Host "✗ " -ForegroundColor Red
         += 
    }
}

if (.Count -gt 0) {
    Write-Host "
Missing files:" -ForegroundColor Red
     | ForEach-Object { Write-Host "  - " -ForegroundColor Yellow }
} else {
    Write-Host "
All files are present! You can now run: npm run build" -ForegroundColor Green
}
