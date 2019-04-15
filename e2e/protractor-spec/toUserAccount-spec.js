

/**
 * @author Abe,Mitchel,Omar,Thanh,Zachary
 */
let url = 'http://tn-rpm-test.s3-website-us-east-1.amazonaws.com/';
//We use the before all function so that a user is logged in for these tests.
    beforeAll(function(){
        browser.get(`${url}`);
        element(by.id('mat-input-0')).sendKeys('test-user');
        element(by.id('mat-input-1')).sendKeys('test');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();
    });
    //THis will ensure that when the Profile button is pressed the proper page is displayed
 describe('Test the routing abilities fo the userAccount function used in the navbar', function(){
     it('It should route the user to the current users account page', function(){
        browser.get(`${url}home`);
        let myButton = element.all(by.tagName('button')).get(1);
        myButton.click();
        element.all(by.tagName('button')).get(0);
        

        expect(browser.getCurrentUrl(`${url}account/2`));
        expect(element(by.id('profile-header')).getText()).toEqual('Profile');
        expect(element(by.id('profile-text')).getText()).toEqual(`Edit your profile information, and then press the 'Save' button to update your information.`);

        
        
     });
 });
 
 