const env = {
  production: {
    CLIENT_HOST       :'',
    NODE_ENV          :'production',
    SERVER_PORT       :'3000',
    API_HOST          :'',
  },
  stage: {
    CLIENT_HOST       :'',
    NODE_ENV          :'production',
    SERVER_PORT       :'3000',
    API_HOST          :'',
  },
  development: {
    CLIENT_HOST       :'',
    NODE_ENV          :'production',
    SERVER_PORT       :'3000',
    API_HOST          :'',
  },
  localhost: {
    CLIENT_HOST       :'http://localhost:3000',
    NODE_ENV          :'development',
    SERVER_PORT       :'3000',
    API_HOST          :'http://localhost:3000',
  },
}
module.exports = env
