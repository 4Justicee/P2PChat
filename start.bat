@echo off
echo Starting P2P Chat Application...
echo.
echo Installing dependencies...
call npm install
echo.
echo Installing client dependencies...
cd client
call npm install
cd ..
echo.
echo Starting the application...
echo Server will run on http://localhost:5000
echo Client will run on http://localhost:3000
echo.
call npm run dev
pause

