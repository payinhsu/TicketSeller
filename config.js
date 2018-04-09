const env = {
  production: {
    CLIENT_HOST       :'https://ticket-selling-tw.herokuapp.com',
    NODE_ENV          :'production',
    SERVER_PORT       :'5000',
    API_HOST          :'https://ticket-selling-tw.herokuapp.com',
    CROSS_DOMAIN       : '*',
  },
  stage: {
    CLIENT_HOST       :'',
    NODE_ENV          :'production',
    SERVER_PORT       :'3000',
    API_HOST          :'',
    CROSS_DOMAIN       : '*',
  },
  development: {
    CLIENT_HOST       :'',
    NODE_ENV          :'production',
    SERVER_PORT       :'3000',
    API_HOST          :'',
    CROSS_DOMAIN       : '*',
  },
  localhost: {
    CLIENT_HOST       :'http://localhost:3000',
    NODE_ENV          :'development',
    SERVER_PORT       :'3000',
    API_HOST          :'http://localhost:3000',
    CROSS_DOMAIN       : '*',
  },
}
module.exports = env
