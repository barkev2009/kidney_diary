cd client
echo "Installing client deps..."
npm i
npm run build
# rm -r /var/www/build
# mv build /var/www
nohup node index.js &