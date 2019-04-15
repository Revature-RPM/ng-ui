
/**
 * @author Abe,Mitchell,Omar,Thanh,Zachary
 */

// What we plan to test
// blanks, invalid input, length, special characters


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
        // browser.pause('4444');
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
        element(by.tagName('mat-form-field')[2]).value == 'emaillllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll';

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
                browser.pause('4444');
                // grab the elements that holds the input for username/ firstname/ lastname/ password/ email
                // get these elements and then test the .sendKeys for each element
                element(by.id('mat-input-0')).sendKeys('Test');
                element(by.id('mat-input-1')).sendKeys('Test1');
                element(by.id('mat-input-2')).sendKeys('test@revature.com');
                // browser.pause('4444');
                
                // get element by tag name specific to the email tag [2], and check if the email is already in use 
                
                expect(element(by.id('emailNotAvailable')).getText()).toEqual(`Email 'test@revature.com' is already in use`);
            })
        }
        
       
        // browser.actions().sendKeys(protractor.Key.ENTER).perform();
        // browser.waitForAngular();

        // // specifiy what url we are wanting to hit after this action is performed
        // expect(browser.getCurrentUrl(`${url}login`));


    })

    


    ///////////////////////////////////////////////////////////////////////////
    // Password tests

    // it('check if register fails with blank passwords', function() {
    //     browser.get(`${url}`);
        
    //     // get element by tag name specific to the password tag [4] & [5], and check if it is empty
    //     element(by.tagName('mat-form-field')[4]).value == '';
    //     element(by.tagName('mat-form-field')[5]).value == '';

    //     browser.actions().sendKeys(protractor.Key.ENTER).perform();
    //     browser.waitForAngular();

    //      // specifiy what url we are wanting to hit after this action is performed
    //      expect(browser.getCurrentUrl(`${url}login`));

    // })



    // it('check if register fails with starting with a space in password', function() {
    //     browser.get(`${url}`);
        
    //     // get element by tag name specific to the password tag [4] & [5], and check if it starts with a space
    //     element(by.tagName('mat-form-field')[4]).value == ' password';
    //     element(by.tagName('mat-form-field')[5]).value == ' password';

    //     browser.actions().sendKeys(protractor.Key.ENTER).perform();
    //     browser.waitForAngular();

    //      // specifiy what url we are wanting to hit after this action is performed
    //      expect(browser.getCurrentUrl(`${url}login`));

    // })



    // it('check if register fails with the length being too long for password', function() {
    //     browser.get(`${url}`);
        
    //     // get element by tag name specific to the password tag [4] & [5], and check if it starts with a space
    //     element(by.tagName('mat-form-field')[4]).value == 'passssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss';
    //     element(by.tagName('mat-form-field')[5]).value == 'passssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss';

    //     browser.actions().sendKeys(protractor.Key.ENTER).perform();
    //     browser.waitForAngular();

    //      // specifiy what url we are wanting to hit after this action is performed
    //      expect(browser.getCurrentUrl(`${url}login`));

    // })




    // ///////////////////////////////////////////////////////////////////////////
    // // Username tests

    // it('check if register fails with blank username', function() {
    //     browser.get(`${url}`);
    
    //     // get element by tag name specific to the username tag [3], and check if it is empty
    //     element(by.tagName('mat-form-field')[3]).value == '';
        

    //     browser.actions().sendKeys(protractor.Key.ENTER).perform();
    //     browser.waitForAngular();

    //      // specifiy what url we are wanting to hit after this action is performed
    //      expect(browser.getCurrentUrl(`${url}login`));

    // })



    // it('check if register fails with username starting with a space', function() {
    //     browser.get(`${url}`);
        
    //     // get element by tag name specific to the username tag [3] and check if it starts with a space
    //     element(by.tagName('mat-form-field')[3]).value == ' username';

    //     browser.actions().sendKeys(protractor.Key.ENTER).perform();
    //     browser.waitForAngular();

    //      // specifiy what url we are wanting to hit after this action is performed
    //      expect(browser.getCurrentUrl(`${url}login`));

    // })



    // it('check if register fails with username being too long', function() {
    //     browser.get(`${url}`);
        
    //     // get element by tag name specific to the username tag [3] and check if it is too long
    //     element(by.tagName('mat-form-field')[3]).value == 'passssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss';

    //     browser.actions().sendKeys(protractor.Key.ENTER).perform();
    //     browser.waitForAngular();

    //      // specifiy what url we are wanting to hit after this action is performed
    //      expect(browser.getCurrentUrl(`${url}login`));

    // })



    // it('check if register fails with an already used username', function() {
    //     browser.get(`${url}`);

    //     // get element by tag name specific to the email tag [2], and check if the email is already in use 
    //     this.userService.checkIfUsernameIsInAvailable(element(by.tagName('mat-form-field')[3]).value) == true;

    //     browser.actions().sendKeys(protractor.Key.ENTER).perform();
    //     browser.waitForAngular();

    //     // specifiy what url we are wanting to hit after this action is performed
    //     expect(browser.getCurrentUrl(`${url}login`));


    // })



    // ///////////////////////////////////////////////////////////////////////////
    // // First name tests

    // it('check if register fails with blank firstname', function() {
    //     browser.get(`${url}`);
    
    //     // get element by tag name specific to the firstname tag [0], and check if it is empty
    //     element(by.tagName('mat-form-field')[0]).value == '';
        

    //     browser.actions().sendKeys(protractor.Key.ENTER).perform();
    //     browser.waitForAngular();

    //      // specifiy what url we are wanting to hit after this action is performed
    //      expect(browser.getCurrentUrl(`${url}login`));

    // })



    // it('check if register fails with starting with a space', function() {
    //     browser.get(`${url}`);
    
    //     // get element by tag name specific to the firstname tag [0], and check if it starts with a space
    //     element(by.tagName('mat-form-field')[0]).value == ' billy';
        

    //     browser.actions().sendKeys(protractor.Key.ENTER).perform();
    //     browser.waitForAngular();

    //      // specifiy what url we are wanting to hit after this action is performed
    //      expect(browser.getCurrentUrl(`${url}login`));

    // })



    // it('check if register fails with first name is greater than 50', function() {
    //     browser.get(`${url}`);
    
    //     // get element by tag name specific to the firstname tag [0], and check if it starts with a space
    //     element(by.tagName('mat-form-field')[0]).value == 'passssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss';
        

    //     browser.actions().sendKeys(protractor.Key.ENTER).perform();
    //     browser.waitForAngular();

    //      // specifiy what url we are wanting to hit after this action is performed
    //      expect(browser.getCurrentUrl(`${url}login`));

    // })




    // ///////////////////////////////////////////////////////////////////////////
    // // Last name tests

    // it('check if register fails with blank lastname', function() {
    //     browser.get(`${url}`);
    
    //     // get element by tag name specific to the lastname tag [1], and check if it is empty
    //     element(by.tagName('mat-form-field')[1]).value == '';
        

    //     browser.actions().sendKeys(protractor.Key.ENTER).perform();
    //     browser.waitForAngular();

    //      // specifiy what url we are wanting to hit after this action is performed
    //      expect(browser.getCurrentUrl(`${url}login`));

    // })



    // it('check if register fails if lastname starts with a space', function() {
    //     browser.get(`${url}`);
    
    //     // get element by tag name specific to the lastname tag [1], and check if it starts with a space
    //     element(by.tagName('mat-form-field')[1]).value == ' bobby';
        

    //     browser.actions().sendKeys(protractor.Key.ENTER).perform();
    //     browser.waitForAngular();

    //      // specifiy what url we are wanting to hit after this action is performed
    //      expect(browser.getCurrentUrl(`${url}login`));

    // })



    // it('check if register fails if lastname is greater than 50 characters', function() {
    //     browser.get(`${url}`);
    
    //     // get element by tag name specific to the lastname tag [1], and check if it is bigger than 50
    //     element(by.tagName('mat-form-field')[1]).value == 'passssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss';
        

    //     browser.actions().sendKeys(protractor.Key.ENTER).perform();
    //     browser.waitForAngular();

    //      // specifiy what url we are wanting to hit after this action is performed
    //      expect(browser.getCurrentUrl(`${url}login`));

    // })


})