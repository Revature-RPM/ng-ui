// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './protractor-spec/update-project-spec.js',
    './protractor-spec/admin-approve-project-spec.js',
    './protractor-spec/admin-login-spec.js',
    './protractor-spec/logout-spec.js',
    './protractor-spec/updateprof-spec.js',
    './protractor-spec/submit-project-route-spec.js',
    './protractor-spec/register-user-spec.js',
    './protractor-spec/submitProject-spec.js'
    
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 300000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};