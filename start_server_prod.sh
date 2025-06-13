cd server
echo "Installing server deps..."
npm i
pm2 delete kidney-diary-back
pm2 start pm2.json
# nohup node index.js &