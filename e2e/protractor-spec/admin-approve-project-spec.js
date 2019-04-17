/**
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus (190107-Java-Spark-USF)
 * Tests pertraining to approving projects as admin
 */

let url = "http://tn-rpm-test.s3-website-us-east-1.amazonaws.com/";

// user must be logged as admin to approve project
beforeAll(() => {
  browser.get(`${url}`);
  //login as admin
  element(by.id("mat-input-0")).sendKeys("admin");
  element(by.id("mat-input-1")).sendKeys("p4ssw0rd");

  browser.actions().sendKeys(protractor.Key.ENTER).perform();
  browser.waitForAngular();
});
describe('This test approves a project', () => {
  // click on all projects button
  it('testing approve button functionality', () => {
    browser.get(`${url}home`);
    browser.waitForAngular(()=>{

        // target all projects button on top right
        element(by.id('mat-tab-label-0-2')).click();

        // click on the approve button marked by a check button
        element(by.tagName('formatButtons mat-icon-button mat-stroked-button ng-tns-c20-14 mat-primary ng-star-inserted'))[0].click();

        browser.waitForAngular();
        
        // getting passed the alert error
        browser.switchTo().alert().accept();

        // checking to see if project has been approved
        expect(element(by.tagName('mat-cell cdk-column-status mat-column-status ng-tns-c20-71 ng-star-inserted').toEqual(' Approved ')));

    });

  });
});
