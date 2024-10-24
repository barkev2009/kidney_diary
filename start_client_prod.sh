cd client
echo "Installing client deps..."
npm i
npm run build
nohup serve -s build -l 3004 &
# rm -r /var/www/build
# mv build /var/www
# nohup node index.js &