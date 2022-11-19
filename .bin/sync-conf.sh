#!/bin/bash
#密码:Tx!code-fusheng
rsync -avz -e 'ssh -p 22221' --progress ./.bin/nginx/ root@42.192.222.62:/etc/nginx/conf.d
# /usr/sbin/nginx -s reload
