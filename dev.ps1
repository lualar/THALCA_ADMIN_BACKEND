param(
    [string]$action = "up"
)

$composeFile = "docker-compose.yml"

switch ($action) {
    "up" {
        Write-Host "Levantar contenedores en modo desarrollo..." -ForegroundColor Green
        docker compose -f $composeFile down -v
        docker compose -f $composeFile up --build -d
        Start-Sleep -Seconds 5
        docker ps
    }
    "down" {
        Write-Host "Deteniendo y eliminando contenedores..." -ForegroundColor Yellow
        docker compose -f $composeFile down -v
    }
    "logs" {
        Write-Host "Mostrando logs del backend..." -ForegroundColor Cyan
        docker compose -f $composeFile logs -f backend
    }
    "status" {
        Write-Host "Estado actual de los contenedores..." -ForegroundColor Magenta
        docker ps
    }
    default {
        Write-Host "Acción no reconocida. Usa: up | down | logs | status" -ForegroundColor Red
    }
}
