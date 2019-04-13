


/**
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus
 */
let url = 'http://tn-rpm-test.s3-website-us-east-1.amazonaws.com/';
beforeAll(function(){
    browser.get(`${url}`);
    element(by.id('mat-input-0')).sendKeys('test-user');
    element(by.id('mat-input-1')).sendKeys('test');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.waitForAngular();
    
})
describe('Testing logout', function(){
    
    it('Should return to the login page', function(){
        browser.get(`${url}home`);
        var myButton = element.all(by.tagName('button')).get(3);

        myButton.click();
        browser.waitForAngular(
            function(){let value = browser.executeScript("return window.localStorage.getItem('user');");
            expect(value).toEqual(null);}
        );
        
        expect(browser.getCurrentUrl(`${url}`));
    });
});