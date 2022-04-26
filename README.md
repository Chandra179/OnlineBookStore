# Book-Ecommerce

### Demo https://alexandria-bookcommerce.herokuapp.com/

<div align="center">
  <img src="https://www.tensorflow.org/images/tf_logo_horizontal.png">
  <img src="https://www.tensorflow.org/images/tf_logo_horizontal.png">
</div>

## Installation step

Make sure to install Python, NodeJs & Postgres.

1. Database

    make sure to create (postgres) database first!
    Populate postgres database with .sql file
    database name: bookstore

```
$ cd /path/to/dir
$ psql bookstore < bookstore.sql
```

2. Environment for python

    Create environment for python

```
$ cd /path/to/dir
$ python -m venv env
$ cd env
$ scripts/activate (or) source bin/activate
$ pip install -r requirements.txt
```

3. Environment file

    create .env file and save it to (core) directory
    file format:

```
SECRET_KEY=YOUR_SECRET_KEY, ex:7642TIBI%^*))_
DATABASE_NAME=bookstore
DATABASE_USER=YOUR_DB_USER
DATABASE_PASSWORD=YOUR_DB_PASSWORD
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

## Running the App

For Server

```
$ cd /path/to/dir
$ git checkout development
$ cd env
$ scripts/activate (or) source bin/activate
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver
```

For Client

```
$ cd /path/to/dir
$ npm start
```
