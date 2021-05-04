-- Deploy fresh database tables
-- \i executes scripts
-- We are essentially running the SQL commands in each file to generate tables for the Docker container
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'