FROM postgres:10.3

# Extending the postgres Docker image by referencing the documentation here:
# https://hub.docker.com/_/postgres

# Copying the tables directory into Docker container
# The /tables/ references the tables directory on your local machine
# The /docker-entrypoint-initdb.d/tables/ references the tables directory in Docker
ADD /tables/ /docker-entrypoint-initdb.d/tables/

# Copying the deploy_schemas.sql file into Docker container
# The deploy_schemas.sql references the file on your local machine
# The /docker-entrypoint-initdb.d/ references the file in Docker
ADD deploy_schemas.sql /docker-entrypoint-initdb.d/