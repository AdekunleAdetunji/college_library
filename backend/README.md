# About Backend

The backend application is powered using fastapi, a lightening fast python web framework.
[Click to learn more about the framework](https://fastapi.tiangolo.com/).
**Note**: To start up the backend server,  please make sure to be inside the backend directory

## Folder Structure

At the root of the backend are main folder containing the core application code while the
tests folder holds the test files for the application

## Database

For the backend, PostgreSQL12 a structured query language was used.
To run this application the postgresql server needs to be up and running and this can be achieved by running the code below

```bash
sudo service postgresql start
```

[Click to learn how to install PostgreSQL version 12](https://www.cherryservers.com/blog/how-to-install-and-setup-postgresql-server-on-ubuntu-20-04)

With the database now installed and running, run the command below on the shell to create the roles,
databases and tables needed for the application to run

```bash
psql -U adetunji -f backend/setup.sql
```

**Note**: Replace the name "adetunji" with your linux username when you installed postgresql
With the above steps correctly done, the database has been setup, proceed to the next section

## Dependency Management

The dependencies which the backend depend on is managed by Poetry, a Python dependency management tool.
[Click to learn more about poetry](https://python-poetry.org/docs/)
Run the code below to install poetry

```bash
pip install poetry
```

With poetry installed, run the command below to have a working environment for the application.

```bash
poetry install
```

Having installed synchronized the environment for the application, the backend application can be startup
using the command below

```bash
ADMIN_USERNAME="admin" ADMIN_PASSWORD="admin" ROLE="library" PASSWORD="library" HOST="localhost" PORT="5433" DATABASE="library" poetry run uvicorn --reload main.app:app
```

With the above command run, the backend server is up and running, open your browser and enter the
[link](http://localhost:8000/docs) to view a SwaggerUI documentation of the backend routes
