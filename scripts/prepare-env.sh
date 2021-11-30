sed -e  "s/MYSQL_HOST/$MYSQL_HOST/" \
    -e  "s/MYSQL_PORT/$MYSQL_PORT/" \
    -e  "s/MYSQL_USER/$MYSQL_USER/" \
    -e  "s/MYSQL_PASSWORD/$MYSQL_PASSWORD/" \
    -e  "s/MYSQL_DB/$MYSQL_DB/" \
    ormconfig.example.json > ormconfig.json
