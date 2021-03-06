## Start to heroku
    $ brew install heroku/brew/heroku
    $ heroku login
    
## Deploy to Heroku
    $ git init
    $ heroku git: remote -a aia-node-nextjs
    $ git add -A
    $ git commit -am "Initial commit"

    Clone the repository
    Use Git to clone aia-node-nextjs's source code to your local machine.

    $ heroku git:clone -a aia-node-nextjs
    $ cd aia-node-nextjs
    Deploy your changes
    Make some changes to the code you just cloned and deploy them to Heroku using Git.

    $ git add .
    $ git commit -am "make it better"
    $ git push heroku master

    If u need to merge from develop to master
    $ git push -f heroku develop:master

    $ heroku run python manage.py migrate

## Deployment to Heroku by docker from scratch
    $ heroku container:login
    $ git clone https://github.com/peterhsu2018/AIA_node_nextjs.git
    $ heroku create (app-name)
    $ heroku container:push web (-app app-name)

## Heroku log
    $ heroku logs -t

## Heroku local run
    $ heroku local web

## Heroku restart
    $ heroku restart
