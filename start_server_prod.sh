cd server
echo "Installing server deps..."
npm i
cd ..
pm2 start pm2.json
# nohup node index.js &