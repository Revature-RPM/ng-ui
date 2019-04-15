


/**
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus (190107-Java-Spark-USF)
 * This tests to make sure the logout function returns us to the login page and the local storage is also cleared
 */
let url = 'http://tn-rpm-test.s3-website-us-east-1.amazonaws.com/';
beforeEach(function(){
    browser.get(`${url}`);
    element(by.id('mat-input-0')).sendKeys('test-user');
    element(by.id('mat-input-1')).sendKeys('test');
    // browser.pause('4444');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.waitForAngular();
    
})
describe('Testing logout', function(){
    
    it('Should return to the login page', function(){
        browser.get(`${url}home`);
        // browser.pause('4444');
        let myButton = element.all(by.tagName('button')).get(3);
        myButton.click();
        browser.waitForAngular(
            function(){let value = browser.executeScript("return window.localStorage.getItem('user');");
            expect(value).toEqual(null);}
        );
        
        expect(browser.getCurrentUrl(`${url}`));
    });
});