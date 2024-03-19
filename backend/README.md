# Backend Overview

The backend application is powered by FastAPI, a lightning-fast Python web framework. [Learn more about FastAPI](https://fastapi.tiangolo.com/).

**Note**: To start the backend server, ensure you're inside the backend directory.

## Folder Structure

- The `main` folder contains the core application code.
- The `tests` folder holds test files for the application.

## Database Setup

The backend uses PostgreSQL 12 as its database. Ensure that the PostgreSQL server is installed and running. You can start the PostgreSQL server with:

```bash
sudo service postgresql start
```

[Follow these instructions to install PostgreSQL version 12](https://www.cherryservers.com/blog/how-to-install-and-setup-postgresql-server-on-ubuntu-20-04)

After starting the database server, create the necessary roles, databases, and tables for the application by running:

```bash
psql -U adetunji -f backend/setup.sql
```

**Note**: Replace the name "adetunji" with your Linux username
With the database setup complete, proceed to the next section.

## Dependency Management

Dependency management for the backend is handled by Poetry, a Python dependency management tool. [Learn more about Poetry](https://python-poetry.org/docs/)

To install Poetry, run:

```bash
pip install poetry
```

After installing Poetry, create a working environment for the application by running:

```bash
poetry install
```

Once the environment is synchronized, start the backend application with the following command:

```bash
ADMIN_USERNAME="admin" ADMIN_PASSWORD="admin" ROLE="library" PASSWORD="library" HOST="localhost" PORT="5433" DATABASE="library" poetry run uvicorn --reload main.app:app
```

The backend server is now up and running. Open your browser and navigate to `http://localhost:8000/docs` to view the SwaggerUI documentation of the backend routes.
