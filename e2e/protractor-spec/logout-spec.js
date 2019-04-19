


/**
 * Run before each test to make sure the user has been logged in properly
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus (190107-Java-Spark-USF)
 */
let url = 'http://tn-rpm-test.s3-website-us-east-1.amazonaws.com/';
beforeEach(function(){
    browser.get(`${url}`);
    element(by.id('mat-input-0')).sendKeys('test-user');
    element(by.id('mat-input-1')).sendKeys('test');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.waitForAngular();
    
})
/**
 * test's that logging the user out will effectively return them to the proper page
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus (190107-Java-Spark-USF)
 */
describe('Testing logout', function(){
    
    it('Should return to the login page', function(){
        //Go to the home page
        browser.get(`${url}home`);
        //get the logout button which is the fourth button on the html document
        let myButton = element.all(by.tagName('button')).get(3);
        //click the button
        myButton.click();
        //wait for angular to actually log the user out
        browser.waitForAngular(
            function(){
            let value = browser.executeScript("return window.localStorage.getItem('user');");
            expect(value).toEqual(null);
            expect(browser.getCurrentUrl()).toEqual(`${url}`);
            
        });
    });
});