/**
 * Tests pertaining to the proper routing of the user to new pages after submiting projects
 * @author Abe Schroeder, Zach Marazita (190107-Java-Spark-USF)
 */

let url = 'http://tn-rpm-test.s3-website-us-east-1.amazonaws.com/';

//We use the before all function so that a user is logged in for these tests.
beforeAll(function(){
    browser.get(`${url}`);
    element(by.id('mat-input-0')).sendKeys('test-user');
    element(by.id('mat-input-1')).sendKeys('test');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.waitForAngular();
})

describe('Testing that the submit project button routes the user to the proper page', function(){ 
    it('Should route to submit project page', function(){
        //got tot the homepage
        browser.get(`${url}home`);
        //get the to profile button and click it
        element.all(by.tagName('button')).get(2).click();
        //ensure that we have gone to the proper page after clicking the buttton
        expect(browser.getCurrentUrl()).toEqual(`${url}project_submission`);
        expect(element.all(by.tagName('h1')).get(1).getText()).toEqual('Submit a Project');
    });
});