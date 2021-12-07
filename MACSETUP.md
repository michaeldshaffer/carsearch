# Setup
This demo assumes a setup of 2 domains:  xyz.com and carsearch.com.  There are lot's of ways to accomplish this but I used the base config of Apache that is included on every Mac (at least up to Big Sur/Mac OS 11.6).  Rather than exhaustively document this, I'm including the web pages that helped me the most...

1. [While this page is about Catalina (a previous Mac OS release, it is still accurate.  Do everything listed on this page EXCEPT the PHP and MySQL stuff, and you'll practically be done.)](https://tech-cookbook.com/2019/10/07/setting-up-your-local-server-on-macos-catalina-2019-mamp/)

2. [A good page with tons of info but seems like it's missing some steps](https://jasonmccreary.me/articles/configure-apache-virtualhost-mac-os-x/)

3. [Specific commands to start/stop/restart Apache on a Mac](https://www.cyberciti.biz/faq/howto-macosx-starting-stopping-apache-web-server/)

4. [Typical Stack Overflow page, make sure you read the accepted response, a lot of articles out there have the old Apache virtual hosts setup, the standard Mac install is more modern](https://stackoverflow.com/questions/17505835/how-do-i-set-up-the-hosts-file-for-multiple-domains-hosts-with-the-same-ip)

5. [More Mac Apache info, upon further review looks to be a less in depth repeat of what was listed above](https://wpbeaches.com/set-up-virtual-hosts-on-macos-big-sur-11-in-apache/)

Junkyard - other pages I read but didn't find super useful in the end
1. https://askubuntu.com/questions/746537/is-it-possible-to-set-up-multiple-local-domains-on-localhost-in-ubuntu-14-04
2. https://stackoverflow.com/questions/35001953/several-virtual-hosts-on-the-same-port-with-apache-2-4

# Hot Tip
After making changes to your hosts file, use this useful command to restart things: dscacheutil -flushcache

# /etc/hosts
```
# Paste these lines to the bottom of hosts file
127.0.0.1 xyz.com www.xyz.com
127.0.0.1 carsearch.com www.carsearch.com
```
# /etc/apache2/extra/httpd-vhosts.conf
```
# Paste this into vhosts.conf, but change it to your user name!
<VirtualHost *:80>
    DocumentRoot "/Users/mikeshaffer/Sites/xyz"
    ServerName xyz.com
    ServerAlias www.xyz.com
    ErrorLog "/private/var/log/apache2/xyz.com-error_log"
    CustomLog "/private/var/log/apache2/xyz.com-access_log" common
</VirtualHost>

<VirtualHost *:80>
    DocumentRoot "/Users/mikeshaffer/Sites/carsearch"
    ServerName carsearch.com
    ServerAlias www.carsearch.com
    ErrorLog "/private/var/log/apache2/carsearch.com-error_log"
    CustomLog "/private/var/log/apache2/carsearch.com-access_log" common
</VirtualHost>
```