# Backend Overview

The backend application is powered by FastAPI, a lightning-fast Python web framework. [Learn more about FastAPI](https://fastapi.tiangolo.com/).

**Note**: To start the backend server, ensure you're inside the backend directory.

## Folder Structure

- The `main` folder contains the core application code.
- The `tests` folder holds test files for the application.

## Database Setup

For the backend two databases are used namely;

- PostgreSQL: For storing permanent data such as user info
- Redis: For storing temporary data such as code sent to email
  
The PostgreSQL version used is 12. To get the application started ensure that the PostgreSQL and Redis-server are both installed and running. You can start the PostgreSQL server with:

```bash
sudo service postgresql start
```

[Follow these instructions to install PostgreSQL version 12](https://www.cherryservers.com/blog/how-to-install-and-setup-postgresql-server-on-ubuntu-20-04)

After starting the database server, create the necessary roles, databases, and tables for the application by running:

```bash
psql -U adetunji -f backend/setup.sql
```

Start the redis server with:

```bash
sudo service redis-server start
```

[Follow these instructions to install redis-server](https://realpython.com/python-redis/)

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

## Mailersend

This application utilizes Mailersend as the mail-service provider for managing email sending. To integrate Mailersend with the application, follow these steps:

- Register a Mailersend Account: Visit the [Mailersend website](https://www.mailersend.com/) to register for an account.
- Obtain API Key: After registering, obtain your API key from the Mailersend dashboard.
- Create Email Template: Create an email template within your Mailersend account.
- Configure Environment Variables: Set up environment variables in your backend application with the following details:
  - MAILERSEND_API_KEY: Your Mailersend API key

**Note**: For this application the module that manages the mailersend api can be found [here](./main/microservices/send_mail.py).

## Celery Setup

Celery is used for managing background tasks in the application. Follow these steps to set up Celery:

- Install Celery: Ensure Celery is installed in your Poetry environment after cloning this repo by running
  
  ```bash
  poetry install
  ```

- Starting the Celery Worker: Open a new terminal window, navigate to the backend directory and run the command below to start the celery worker

  ```bash  
  MAILERSEND_API_KEY="your_mailer_send_api_key" poetry run celery -A main.microservices.celery.app.app worker --loglevel=INFO
  ```

Once the environment is synchronized, in a new terminal window, navigate to the backend directory and start the backend application with the following command:

```bash
ADMIN_USERNAME="admin" ADMIN_PASSWORD="admin" ROLE="library" PASSWORD="library" HOST="localhost" PORT="5433" DATABASE="library" MAILERSEND_API_KEY="Your_mailer_send_api_key" poetry run uvicorn --reload main.app:app
```

The backend server is now up and running. Open your browser and navigate to `http://localhost:8000/docs` to view the SwaggerUI documentation of the backend routes.
