@echo off

REM Variables de conexión
set DB_HOST="localhost"
set DB_PORT="5432"
set DB_USER=THALCA_Admin
set DB_NAME=thalca_db_admin

REM Pide la contraseña de forma segura
set /p PGPASSWORD=Introduce tu contraseña:

REM Conexión y ejecución de un comando SQL
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -c "SELECT version();"

pause