/**
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus (190107-Java-Spark-USF)
 * General tests pertaining to the registering of new users
 */
describe('Test Register', function() {

    let url = 'http://tn-rpm-test.s3-website-us-east-1.amazonaws.com/'

    ///////////////////////////////////////////////////////////////////////////
    // Registration tests
    async function getUser(){
        let response = await fetch( `${url}username/ProtractorUser`,{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }, 
        });

        return JSON.parse(response.body);
    };

    it('check if register works with valid inputs', function() {
        let value = browser.executeScript("return window.localStorage.getItem('user');");
        if(value) {
            browser.get(`${url}home`);
            let myButton = element.all(by.tagName('button')).get(3);
            myButton.click();
            browser.waitForAngular(
                function(){
                    browser.get(`${url}`);
                    browser.get(`${url}auth/register`);

                    // grab the elements that holds the input for username/ firstname/ lastname/ password/ email
                    // get these elements and then test the .sendKeys for each element
                    element(by.id('mat-input-0')).sendKeys('Protractor1');
                    element(by.id('mat-input-1')).sendKeys('Test1');
                    element(by.id('mat-input-2')).sendKeys('protractor2@revature.com');
                    element.all(by.css('.mat-button')).get(0).click();
                    element(by.id('mat-input-3')).sendKeys('ProtractorUser');
                    
                    element(by.id('inputPassword')).sendKeys('password');
                    element(by.id('mat-input-5')).sendKeys('password');
                    element.all(by.css('.mat-button')).get(3).click();
                    browser.sleep(100);
                    element.all(by.tagName('button')).get(4).click();
                    browser.waitForAngular(function(){ 
                    let row = element.all(by.css('.mat-table tr')).get(1);
                    expect(row).toEqual(null);
                    expect(browser.getCurrentUrl(`${url}home`))
                    let user = getUser();
                    expect(user.firstName).toEqual('Protractor1');
                    expect(user.lastName).toEqual('Test1');
                    expect(user.email).toEqual('protractor2@revature.com');
                    expect(user.username).toEqual('ProtractorUser');
                    expect(user.password).toEqual('password');
                    });
                }
            )
        }
    })


    ///////////////////////////////////////////////////////////////////////
    
    it('check if register fails with all blank inputs', function() {
        let value = browser.executeScript("return window.localStorage.getItem('user');");
        if(value) {
            browser.get(`${url}home`);
            let myButton = element.all(by.tagName('button')).get(3);
            myButton.click();
        }
        browser.get(`${url}`);
    
        // get these elements and then test the .sendKeys for each element
        
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })


    ///////////////////////////////////////////////////////////////////////////
    // Email tests
   
    it('check if register fails with blank email', function() {
        let value = browser.executeScript("return window.localStorage.getItem('user');");
        if(value) {
            browser.get(`${url}home`);
            let myButton = element.all(by.tagName('button')).get(3);
            myButton.click();
        }
        browser.get(`${url}`);
    
        // get element by tag name specific to the email tag [2], and check if it is empty
        element(by.tagName('mat-form-field')[2]).value == '';

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })

    it('check if register fails with invalid email without @ symbol or .com', function() {
        let value = browser.executeScript("return window.localStorage.getItem('user');");
        if(value) {
            browser.get(`${url}home`);
            let myButton = element.all(by.tagName('button')).get(3);
            myButton.click();
        }
        browser.get(`${url}`);

        // get element by tag name specific to the email tag [2], and check if it is invalid 
        element(by.tagName('mat-form-field')[2]).value == 'email';

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

        // specifiy what url we are wanting to hit after this action is performed
        expect(browser.getCurrentUrl(`${url}login`));


    })

    it('check if register fails with invalid email that starts with a space', function() {
        let value = browser.executeScript("return window.localStorage.getItem('user');");
        if(value) {
            browser.get(`${url}home`);
            let myButton = element.all(by.tagName('button')).get(3);
            myButton.click();
        }
        browser.get(`${url}`);

        // get element by tag name specific to the email tag [2], and check if there is a space at the begginging 
        element(by.tagName('mat-form-field')[2]).value == ' email@gmail.com';

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

        // specifiy what url we are wanting to hit after this action is performed
        expect(browser.getCurrentUrl(`${url}login`));


    })

    it('check if register fails with invalid email length', function() {
        let value = browser.executeScript("return window.localStorage.getItem('user');");
        if(value) {
            browser.get(`${url}home`);
            let myButton = element.all(by.tagName('button')).get(3);
            myButton.click();
        }
        browser.get(`${url}`);

        // get element by tag name specific to the email tag [2], and check if the length is too long 
        element(by.tagName('mat-form-field')[2]).value == 'emailllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll';

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

        // specifiy what url we are wanting to hit after this action is performed
        expect(browser.getCurrentUrl(`${url}login`));


    })

    it('check if register fails with an already used email', function() {
        let value = browser.executeScript("return window.localStorage.getItem('user');");
        if(value) {
            browser.get(`${url}home`);
            let myButton = element.all(by.tagName('button')).get(3);
            myButton.click();
            browser.waitForAngular(function(){
                browser.get(`${url}`);
                browser.get(`${url}auth/register`);

                // grab the elements that holds the input for username/ firstname/ lastname/ password/ email
                // get these elements and then test the .sendKeys for each element
                element(by.id('mat-input-0')).sendKeys('Test');
                element(by.id('mat-input-1')).sendKeys('Test1');
                element(by.id('mat-input-2')).sendKeys('test@revature.com');
                
                // get element by tag name specific to the email tag [2], and check if the email is already in use 
                expect(element(by.id('emailNotAvailable')).getText()).toEqual(`Email 'test@revature.com' is already in use`);
            })
        }
    })
})