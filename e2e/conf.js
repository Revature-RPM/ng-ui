exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js', './protractor-spec/admin-logic-spec.js', './prtractor-spec/logout-spec.js'];
}