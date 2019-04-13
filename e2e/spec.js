// describe('Test App', function () {

//     it('check login', function () {
//         browser.get('http://rpmclient.revature.com.s3-website-us-west-2.amazonaws.com/');
//         element(by.id('mat-input-0')).sendKeys('admin');
//         element(by.id('mat-input-1')).sendKeys('p4ssw0rd');
//         browser.actions().sendKeys(protractor.Key.ENTER).perform();
//         browser.waitForAngular();
//         expect(browser.getCurrentUrl('http://rpmclient.revature.com.s3-website-us-west-2.amazonaws.com/home'));
//         // var table = //element(by.className('mat-table'));
//         var row = element.all(by.css('.mat-table tr')).get(1);
//         var cells = row.all(by.tagName('td'));
//         expect(cells.get(0).getText()).toEqual('admin');
//         expect(cells.get(1).getText()).toEqual('Adam');
//         expect(cells.get(2).getText()).toEqual('Inn');
//         expect(cells.get(3).getText()).toEqual('admin@revature.com');
//         expect(cells.get(4).getText()).toEqual('ROLE_ADMIN');

//         element(by.id('mat-input-2')).sendKeys('test');
//         row = element.all(by.css('.mat-table tr')).get(1);
//         cells = row.all(by.tagName('td'));

//         expect(cells.get(0).getText()).toEqual('test-user');
//         expect(cells.get(1).getText()).toEqual('Tester');
//         expect(cells.get(2).getText()).toEqual('McTesterson');
//         expect(cells.get(3).getText()).toEqual('test@revature.com');

//         element(by.id('mat-tab-label-0-2')).click();

//         row = element.all(by.css('.mat-table tr')).get(1);
//         cells = row.all(by.tagName('td'));

//         expect(cells.get(0).getText()).toEqual('Revature Package Manager (RPM)');
//         expect(cells.get(1).getText()).toEqual('1810-oct08-java-usf');
//         expect(cells.get(2).getText()).toEqual('Wezley Singleton');
//         expect(cells.get(3).getText()).toEqual('Java/J2EE');
//         expect(cells.get(4).getText()).toEqual('Approved');

//         element.all(by.id('icon')).get(1).click();
//         browser.sleep(2000);
//         element.all(by.css('.mat-menu-item')).get(1).click();
//         browser.waitForAngular();


//     })

//     it('check create account', function () {
//         browser.get('http://rpmclient.revature.com.s3-website-us-west-2.amazonaws.com/');
//         element.all(by.css('.mat-button')).get(1).click();
//         element(by.id('mat-input-2')).sendKeys('Protractor1');
//         element(by.id('mat-input-3')).sendKeys('Test1');
//         var emailField = element(by.id('mat-input-4'));
//         emailField.sendKeys('protractor@gmail.com');
//         expect(emailField.getAttribute('mattooltip')).toBe('Must be valid @revature.com Email.');
//         emailField.clear();
//         emailField.sendKeys('protractor1@revature.com');
//         element.all(by.css('.mat-button')).get(0).click();

//         element(by.id('mat-input-5')).sendKeys('ProtractorUsername1');
//         element(by.id('inputPassword')).sendKeys('password');
//         element(by.id('mat-input-7')).sendKeys('password');
//         element.all(by.css('.mat-button')).get(3).click();
//         element(by.css('.mat-flat-button')).click();

//         var row = element.all(by.css('.mat-table tr')).get(1);
//         expect(row).toBeNull();
//     })

//     it('check protractor account', function () {
//         browser.get('http://rpmclient.revature.com.s3-website-us-west-2.amazonaws.com/');
//         element(by.id('mat-input-0')).sendKeys('ProtractorUsername1');
//         element(by.id('mat-input-1')).sendKeys('password');
//         browser.actions().sendKeys(protractor.Key.ENTER).perform();
//         browser.waitForAngular();
//         var row = element.all(by.css('.mat-table tr')).get(1);
//         row.isPresent();

//         element.all(by.id('icon')).get(2).click();
//         element(by.id('project_name')).sendKeys('Protractor Project');
//         element(by.name('batchName')).sendKeys('Test Batch');
//         element(by.id('inputGroupMembers')).click();
//         element(by.id('userItemText')).sendKeys('Kat');
//         browser.actions().sendKeys(protractor.Key.ENTER).perform();
//         element(by.id('userItemText')).sendKeys('Josh');
//         browser.actions().sendKeys(protractor.Key.ENTER).perform();
//         element(by.id('userItemText')).sendKeys('Sean');
//         browser.actions().sendKeys(protractor.Key.ENTER).perform();
//         element(by.id('userItemText')).sendKeys('Colt');
//         browser.actions().sendKeys(protractor.Key.ENTER).perform();
//         element(by.id('userItemText')).sendKeys('Ryan');
//         browser.actions().sendKeys(protractor.Key.ENTER).perform();
//         element(by.id('userItemText')).sendKeys('Mike');
//         browser.actions().sendKeys(protractor.Key.ENTER).perform();
//         element(by.buttonText('Submit')).click();

//         browser.sleep(300);

//         element(by.name('description')).sendKeys('This is a sample description. This was a project generated by Protractor testing!');

//         browser.sleep(300);

//         element(by.id('inputGithubLink')).click();
//         element(by.id('userItemText')).sendKeys('https://github.com/angular/protractor');
//         browser.actions().sendKeys(protractor.Key.ENTER).perform();
//         element(by.buttonText('Submit')).click();

//         browser.sleep(1000);

//         element(by.className('mat-select-value')).click();
//         browser.sleep(1000);
//         element.all(by.className('mat-option-text')).get(2).click();

//         var path = require('path');
//         // set file detector
//         var remote = require('../node_modules/selenium-webdriver/remote');
//         browser.setFileDetector(new remote.FileDetector());


//         var fileToUpload = '../e2e/protractor.jpeg';
//         // __dirname, 
//         var absolutePath = path.resolve(__dirname, fileToUpload);

//         var fileElem = element(by.id('screenShots'));

//         // Unhide file input
//         browser.executeScript("arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px';  arguments[0].style.opacity = 1", fileElem.getWebElement());

//         fileElem.sendKeys(absolutePath);

//         // take a breath 
//         browser.driver.sleep(2000);

//         browser.sleep(1000);

//         element(by.buttonText('Submit Project')).click();
//         browser.sleep(4000);

//         row = element.all(by.css('.mat-table tr')).get(1);
//         cells = row.all(by.tagName('td'));

//         expect(cells.get(0).getText()).toEqual('Protractor Project');
//         expect(cells.get(1).getText()).toEqual('Test Batch');
//         expect(cells.get(2).getText()).toEqual('Protractor1 Test1');
//         expect(cells.get(3).getText()).toEqual('JavaScript MVC');
//         expect(cells.get(4).getText()).toEqual('pending');
//     })
// });