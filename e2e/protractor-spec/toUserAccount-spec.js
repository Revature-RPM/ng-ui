import { browser } from "protractor";

/**
 * @author Abe,Mitchel,Omar,Thanh,Zachary
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
    //THis will ensure that when the Profile button is pressed the proper page is displayed
 describe('Test the routing abilities fo the userAccount function used in the navbar', function(){
     it('It should route the user to the current users account page')
     {
        browser.get(`${url}`);
        var myButton = element(by.buttonText('Profile'));
        myButton.click();
        

        expect(browser.getCurrentUrl(`${url}`));
        expect(element(by.id('profile-header')).getText().toEqual('Profile'));
        expect(element(by.id('profile-text')).getText().toEqual('Edit your profile information, and then press the '+Save+' button to update your information.'));


        
     }
 })
 afterAll(function(){
    var myButton = element(by.buttonText('Logout'));
    myButton.click();
 })