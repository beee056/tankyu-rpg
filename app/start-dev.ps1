[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$esbuildBin = "C:\探究プロジェクト\tankyu-rpg\app\node_modules\.pnpm\@esbuild+win32-x64@0.21.5\node_modules\@esbuild\win32-x64\esbuild.exe"
$env:ESBUILD_BINARY_PATH = $esbuildBin
Set-Location "C:\探究プロジェクト\tankyu-rpg\app\frontend"
node "C:\探究プロジェクト\tankyu-rpg\app\node_modules\.pnpm\vite@5.4.21_@types+node@22.19.19_terser@5.47.1\node_modules\vite\bin\vite.js" --port 5173
