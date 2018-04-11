const _ = require('lodash');
const moment = require('moment');
const request = require('superagent');
const graphql = require('graphql');

const { NODE_ENV } = process.env;
const config = require('../../server/config');

const { API_HOST } = config[NODE_ENV];

const resolvers = {
  Query: {
    loginInformation: (parentValue, args, { req }) =>
      request
        .get(`${API_HOST}/rest/user`)
        .set({ authorization: `${req.headers.authorization}` })
        .then(() => { return { isLogin: true }; })
        .catch((err) => { return { isLogin: false }; })
    ,
  },
  Mutation: {
    updatePersonalBankAccount: (parentValue, { id, isCurrentlyActive = null, mark = null }, { req }) =>
      request
        .put(`${API_HOST}/rest/serviceBankAccount/${id}`)
        .set({ authorization: `${req.headers.authorization}` })
        .send(Object.assign(
          {},
          !_.isNull(isCurrentlyActive) ? { active: isCurrentlyActive } : {},
          !_.isNull(mark) ? { remark: mark } : {},
        ))
        .then(res => res.body)
    ,
  },
};
module.exports = resolvers;
