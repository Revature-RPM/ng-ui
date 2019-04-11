/**
 * @author Zachary, Abe
 */

let url = 'http://rpmclient.revature.com.s3-website-us-west-2.amazonaws.com/';

//We use the before all function so that a user is logged in for these tests.
beforeAll(function(){
    browser.get(`${url}`);
    element(by.id('mat-input-0')).sendKeys('Tester');
    element(by.id('mat-input-1')).sendKeys('McTesterson');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.waitForAngular();
})

describe('Testing that the submit project button routes the user to the proper page', function(){ 
    it('Should route to submit project page', function(){
        browser.get(`${url}`);
        element(by.id('icon')).click();
        expect(browser.getCurrentUrl(`${url}`));
        expect(element(by.id('title')).getText().toEqual('Submit a Project'));
    });
});