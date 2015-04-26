#!/usr/bin/env bash

ssh root@kyle-murphy.co.uk 'service nodeblog stop; cd /var/www/node-blog; git pull; npm install; service node-blog start'