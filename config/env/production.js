'use strict';

module.exports = {
  secure: {
    ssl: true,
    privateKey: './config/sslcerts/key.pem',
    certificate: './config/sslcerts/cert.pem'
  },
  port: process.env.PORT ||8443,
  db: {
      uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI ||'mongodb://rajkiran:raj1234@ds051523.mongolab.com:51523/skyees',
     options: {
      user: '',
      pass: ''
    },
     // Enable mongoose debug mode
     debug: process.env.MONGODB_DEBUG || false
  },
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'combined',
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      stream: 'access.log'
    }
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID ||'312563625534623',
    clientSecret: process.env.FACEBOOK_SECRET ||'2b60606d551c0403dbf2010396782646',
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
    clientID: process.env.PAYPAL_ID ||'ActmR3PG_wOA_79lamO_TiHyINcthljxOrPKvXR2Zzi6KXNuPY2bI6OLHHl2VJ1MiZCppk_jzdrRFy0x',
    clientSecret: process.env.PAYPAL_SECRET ||'EE12sp80LEWwfeY6e288352hZg9SPd09izAAQiTjq7-pjK-CySsPuBf-wa9GLmm-n2DwqGVsKxzw-Y_k',
    callbackURL: '/api/auth/paypal/callback',
    sandbox: false
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
  seedDB: process.env.MONGO_SEED || false
};
