'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/https-dev',
    options: {
      user: '',
      pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'dev',
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      //stream: 'access.log'
    }
  },
  app: {
    title: defaultEnvConfig.app.title + ' - Development Environment'
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID ||'1664525490499797',
    clientSecret: process.env.FACEBOOK_SECRET ||'925da8e5874378c83aa9b9774839b415',
    callbackURL: '/api/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
    clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
    callbackURL: '/api/auth/twitter/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || 'APP_ID',
    clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/google/callback'
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID || 'APP_ID',
    clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/linkedin/callback'
  },
  github: {
    clientID: process.env.GITHUB_ID || 'APP_ID',
    clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/github/callback'
  },
  paypal: {
    clientID: process.env.PAYPAL_ID ||'AeU5vl-L9pyKUTrMgcP6Isyo5PwIMRlAi3QuEov9sI0Fq5kYMptIt532yDjnRdpwop_9Yuj8BafuBYQ_',
    clientSecret: process.env.PAYPAL_SECRET ||'EL9j2-_SCyzdQUYvu_uzh0zAHMxaEf-1ShPOwW6-6v2mbJX9H6kNeUBSmF6d8N1gXs0zp-__XhU-hVJ7',
    callbackURL: '/api/auth/paypal/callback',
    sandbox: false
  },
  amazon: {
        clientID: process.env.AMAZON_ID ||'amzn1.application-oa2-client.9d181b1955a94e7d82751a7df1c30a75',
        clientSecret: process.env.AMAZON_SECRET ||'df6a3eb66ca6094750b1c97f39b2f6eab5cd55d89f5b8adef799a64335c83274',
        callbackURL: '/api/auth/amazon/callback'
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  },
  livereload: true,
  seedDB: process.env.MONGO_SEED || false
};
