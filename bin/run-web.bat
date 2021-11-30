@echo off
echo.
echo [信息] 使用 Vue CLI 命令运行 Web 工程。
echo.

%~d0
cd %~dp0

cd ..
yarn dev

pause