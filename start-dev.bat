@echo off
chcp 65001 >nul

echo ============================================
echo  LIGHTHOUSE RPG - 開発サーバー起動スクリプト
echo ============================================
echo.

echo [1/4] ポート 5173 (Frontend) を確認・解放中...
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":5173 " 2^>nul') do (
    if not "%%p"=="" (
        echo   PID %%p を終了します
        taskkill /PID %%p /F >nul 2>&1
    )
)
echo     完了

echo [2/4] ポート 8787 (Backend) を確認・解放中...
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":8787 " 2^>nul') do (
    if not "%%p"=="" (
        echo   PID %%p を終了します
        taskkill /PID %%p /F >nul 2>&1
    )
)
echo     完了

echo [3/4] 開発サーバーを起動中...
cd /d "%~dp0app"
start "tankyu-dev" cmd /k "pnpm dev"

echo [4/4] ブラウザを開く前に少し待機中...
timeout /t 5 /nobreak >nul

echo     ブラウザを起動しています: http://localhost:5173
start "" "http://localhost:5173"

echo.
echo 起動完了！このウィンドウは閉じてもOKです。
echo ログは "tankyu-dev" ウィンドウで確認してください。
pause
