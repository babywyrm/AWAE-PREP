#####################################
#####################################


# Docker container for OSWE lab (modules 3 and 4)
#
# To create the image
#    docker image build -t atutor .
#
# To run atutor on port 80
#    docker run -dit -p80:80 --name atutor -d atutor
#
# To configure mysql
#
#   docker exec -it atutor bash -c '/root/config_mysql.sh && /etc/init.d/mysql start'
#
# Then browse to the dockers IP on port 80 and follow the atutor initial setup steps (mysql password is set to toor)
FROM php:5.6.30-apache

LABEL "maintainer"="someone <someone@transmission.ninja>" \
      "version.php"="5.6.30" \
      "version.Atutor"="2.2.1"

EXPOSE 80 

# Install the needed PHP libraries along with some other bits and bobs
# ================================
RUN apt-get update; \
    apt-get install -y wget unzip expect; \
    docker-php-ext-install mysql; \
    apt-get install -y libfreetype6-dev libjpeg62-turbo-dev wget unzip; \
    docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/lib; \
    docker-php-ext-install gd

# Configure PHP writing a custom php .ini
# ================================
RUN touch /var/log/php-errors.log; \
    echo "date.timezone=Europe/Dublin" >> /usr/local/etc/php/conf.d/docker-php.ini; \
    echo "display_errors = On" >> /usr/local/etc/php/conf.d/docker-php.ini; \
    echo "log_errors = On" >> /usr/local/etc/php/conf.d/docker-php.ini; \
    echo "error_log = /var/log/atutor.log" >> /usr/local/etc/php/conf.d/docker-php.ini;
    
# Download and install ATutor
# ATutor-atutor_2_2_1 
# ===========================
RUN wget -O /tmp/atutor.zip --quiet https://github.com/atutor/ATutor/archive/atutor_2_2_1.zip; \
    unzip /tmp/atutor.zip -d /tmp; \
    rm -rf /var/www/html; \
    mv /tmp/ATutor-atutor_2_2_1 /var/www/html/; \
    touch /var/www/html/include/config.inc.php; \
    chmod a+rw -R /var/www/html/; \
    echo "<?php phpinfo(); ?>" > /var/www/html/phpinfo.php; \
    rm /tmp/atutor.zip 

RUN mkdir /content; chmod a+rw -R /content

# Setup mysql
# ================================
RUN wget http://dev.mysql.com/get/mysql-apt-config_0.3.5-1debian8_all.deb -O /tmp/mysql.deb \
&& printf '\n2\n' | dpkg -i /tmp/mysql.deb \
&& apt-get update

RUN echo '#!/usr/bin/expect -f' >> /root/config_mysql.sh; \
echo 'set force_conservative 0' >> /root/config_mysql.sh; \
echo 'if {$force_conservative} {' >> /root/config_mysql.sh; \
echo '        set send_slow {1 .1}' >> /root/config_mysql.sh; \
echo '        proc send {ignore arg} {' >> /root/config_mysql.sh; \
echo '                sleep .1' >> /root/config_mysql.sh; \
echo '                exp_send -s -- $arg' >> /root/config_mysql.sh; \
echo '        }' >> /root/config_mysql.sh; \
echo '}' >> /root/config_mysql.sh; \
echo 'set timeout -1' >> /root/config_mysql.sh; \
echo 'spawn apt-get install mysql-community-server' >> /root/config_mysql.sh; \
echo 'match_max 100000' >> /root/config_mysql.sh; \
echo 'set prompt \[y/N\] ' >> /root/config_mysql.sh; \
echo 'expect -re $prompt' >> /root/config_mysql.sh; \
echo 'send -- "Y\\r"' >> /root/config_mysql.sh; \
echo 'expect -re $prompt' >> /root/config_mysql.sh; \
echo 'send -- "Y\\r"' >> /root/config_mysql.sh; \
echo 'expect "Enter root password: "' >> /root/config_mysql.sh; \
echo 'send -- "toor\\r"' >> /root/config_mysql.sh; \
echo 'expect "Re-enter root password: "' >> /root/config_mysql.sh; \
echo 'send -- "toor\\r"' >> /root/config_mysql.sh; \
echo 'expect eof' >> /root/config_mysql.sh  && chmod +x /root/config_mysql.sh

#####################################
#####################################
