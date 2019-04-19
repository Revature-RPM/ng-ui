/**
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus (190107-Java-Spark-USF)
 * Run before each test to make sure the user has been logged in properly
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
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus (190107-Java-Spark-USF)
 * test's that logging the user out will effectively return them to the proper page
 */
describe('Testing profile button', function(){
    
    it('Should route to the users profile page', function(){
        browser.get(`${url}home`);
        let myButton = element.all(by.tagName('button')).get(4);
        myButton.click();
        
        browser.waitForAngular(
            function(){
                
            expect(browser.getCurrentUrl()).toEqual(`${url}account/2`)
            
        }
        );
        
        
    });
});