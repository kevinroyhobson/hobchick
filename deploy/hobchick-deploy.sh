#!/bin/bash

echo "Deploying hobchick.com..."
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install python3 python3-pip python3-django apache2 libapache2-mod-wsgi-py3
sudo pip3 install sendgrid

echo "Updating to the tip of master."
cd ~/src/hobchick
git checkout master
git pull

echo "Killing old static files."
sudo rm -r /var/www/static

echo "Copying over new static files."
sudo cp -a -r hobchick/hobchick/static /var/www/static
sudo rm /var/www/static/js/*
sudo rm /var/www/static/js/mobile/*

echo "Restarting web server."
sudo service apache2 restart

echo "Deploy successful."
