## Deploy

1. npm install

2. export NODE_ENV=production|| set NODE_ENV=production&& next build

4. Upload files to deploy environment
    1. .next
    2. lib
    3. config.js
    4. server.js
    5. package.json
5. run command in order to run the server
    1. npm install
    2. export NODE_ENV=production|| set NODE_ENV=production&& node server.js

## Start to heroku
    $ brew install heroku/brew/heroku
    $ heroku login

## Deployment to Heroku
    $ git init
    $ heroku git: remote -a ticket-selling-tw
    $ git add -A
    $ git commit -am "Initial commit"

    Clone the repository
    Use Git to clone ticket-selling-tw's source code to your local machine.

    $ heroku git:clone -a ticket-selling-tw
    $ cd ticket-selling-tw
    Deploy your changes
    Make some changes to the code you just cloned and deploy them to Heroku using Git.

    $ git add .
    $ git commit -am "make it better"
    $ git push heroku master

    If u need to merge from develop to master
    $ git push -f heroku develop:master

    $ heroku run python manage.py migrate

## Heroku log
    $ heroku logs -t

## Heroku local run
    $ heroku local web

## Heroku restart
    $ heroku restart