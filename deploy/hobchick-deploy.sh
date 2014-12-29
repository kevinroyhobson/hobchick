#!/bin/bash

echo "Deploying hobchick.com..."

echo "Updating to the tip of master."
cd ~/src/hobchick
git checkout master
git pull

echo "Killing old static files."
rm -r /var/www/static

echo "Copying over new static files."
cp -a -r hobchick/hobchick/static /var/www/static

echo "Restarting web server."
service apache2 restart

echo "Deploy successful."
