import { browser } from "protractor";

/**
 * @author Abe
 */
let url = 'http://rpmclient.revature.com.s3-website-us-west-2.amazonaws.com/';
beforeAll(function(){
    browser.get(`${url}`);
    element(by.id('mat-input-0')).sendKeys('Tester');
    element(by.id('mat-input-1')).sendKeys('McTesterson');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.waitForAngular();
})
describe('Tests get all projects as a user', function(){
    it('should get all of the users projects',function(){
        browser.get(`${url}`);
        expect();
    });
})