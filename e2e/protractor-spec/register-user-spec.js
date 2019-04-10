import { browser } from "protractor";
import { element } from "@angular/core/src/render3";
import { UserService } from 'src/app/core/services/user.service';


// What we plan to test
// blanks, invalid input, length, special characters


describe('Test Register', function() {

    let url = 'http://rpmclient.revature.com.s3-website-us-west-2.amazonaws.com/';

    ///////////////////////////////////////////////////////////////////////////
    // Registration tests

    it('check if register works with valid inputs', function() {

        browser.get(`${url}`);
        // grab the elements that holds the input for username/ firstname/ lastname/ password/ email
        // get these elements and then test the .sendKeys for each element
        
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();
        
        // specifiy what url we are wanting to hit after this action is performed
        expect(browser.getCurrentUrl(`${url}login`));

        

    })




    ///////////////////////////////////////////////////////////////////////////
    // All input field tests

    it('check if register fails with all blank inputs', function() {
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
        browser.get(`${url}`);
    
        // get element by tag name specific to the email tag [2], and check if it is empty
        element(by.tagName('mat-form-field')[2]).sendKeys() == null;

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })



    it('check if register fails with invalid email without @ symbol or .com', function() {
        browser.get(`${url}`);

        // get element by tag name specific to the email tag [2], and check if it is invalid 
        element(by.tagName('mat-form-field')[2]).sendKeys('email');

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

        // specifiy what url we are wanting to hit after this action is performed
        expect(browser.getCurrentUrl(`${url}login`));


    })



    it('check if register fails with invalid email that starts with a space', function() {
        browser.get(`${url}`);

        // get element by tag name specific to the email tag [2], and check if there is a space at the begginging 
        element(by.tagName('mat-form-field')[2]).sendKeys(' email@gmail.com');

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

        // specifiy what url we are wanting to hit after this action is performed
        expect(browser.getCurrentUrl(`${url}login`));


    })



    it('check if register fails with invalid email length', function() {
        browser.get(`${url}`);

        // get element by tag name specific to the email tag [2], and check if the length is too long 
        element(by.tagName('mat-form-field')[2]).getSize() > 250;

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

        // specifiy what url we are wanting to hit after this action is performed
        expect(browser.getCurrentUrl(`${url}login`));


    })



    it('check if register fails with an already used email', function() {
        browser.get(`${url}`);

        // get element by tag name specific to the email tag [2], and check if the email is already in use 
        checkIfEmailIsInUse(element(by.tagName('mat-form-field')[2]).value) == false;

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

        // specifiy what url we are wanting to hit after this action is performed
        expect(browser.getCurrentUrl(`${url}login`));


    })

    


    ///////////////////////////////////////////////////////////////////////////
    // Password tests

    it('check if register fails with blank passwords', function() {
        browser.get(`${url}`);
        
        // get element by tag name specific to the password tag [4] & [5], and check if it is empty
        element(by.tagName('mat-form-field')[4]).sendKeys() == null;
        element(by.tagName('mat-form-field')[5]).sendKeys() == null;

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })



    it('check if register fails with starting with a space in password', function() {
        browser.get(`${url}`);
        
        // get element by tag name specific to the password tag [4] & [5], and check if it starts with a space
        element(by.tagName('mat-form-field')[4]).sendKeys(' password');
        element(by.tagName('mat-form-field')[5]).sendKeys(' password');

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })



    it('check if register fails with the length being too long for password', function() {
        browser.get(`${url}`);
        
        // get element by tag name specific to the password tag [4] & [5], and check if it starts with a space
        element(by.tagName('mat-form-field')[4]).getSize() > 50;
        element(by.tagName('mat-form-field')[5]).getSize() > 50;

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })




    ///////////////////////////////////////////////////////////////////////////
    // Username tests

    it('check if register fails with blank username', function() {
        browser.get(`${url}`);
    
        // get element by tag name specific to the username tag [3], and check if it is empty
        element(by.tagName('mat-form-field')[3]).sendKeys() == null;
        

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })



    it('check if register fails with username starting with a space', function() {
        browser.get(`${url}`);
        
        // get element by tag name specific to the username tag [3] and check if it starts with a space
        element(by.tagName('mat-form-field')[3]).sendKeys(' username');

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })



    it('check if register fails with username being too long', function() {
        browser.get(`${url}`);
        
        // get element by tag name specific to the username tag [3] and check if it is too long
        element(by.tagName('mat-form-field')[3]).getSize() > 50;

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })



    it('check if register fails with an already used username', function() {
        browser.get(`${url}`);

        // get element by tag name specific to the email tag [2], and check if the email is already in use 
        checkIfUsernameIsInAvailable(element(by.tagName('mat-form-field')[3]).value) == true;

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

        // specifiy what url we are wanting to hit after this action is performed
        expect(browser.getCurrentUrl(`${url}login`));


    })



    ///////////////////////////////////////////////////////////////////////////
    // First name tests

    it('check if register fails with blank firstname', function() {
        browser.get(`${url}`);
    
        // get element by tag name specific to the firstname tag [0], and check if it is empty
        element(by.tagName('mat-form-field')[0]).sendKeys() == null;
        

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })



    it('check if register fails with starting with a space', function() {
        browser.get(`${url}`);
    
        // get element by tag name specific to the firstname tag [0], and check if it starts with a space
        element(by.tagName('mat-form-field')[0]).sendKeys(' billy');
        

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })



    it('check if register fails with first name is greater than 50', function() {
        browser.get(`${url}`);
    
        // get element by tag name specific to the firstname tag [0], and check if it starts with a space
        element(by.tagName('mat-form-field')[0]).getSize() > 50;
        

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })




    ///////////////////////////////////////////////////////////////////////////
    // Last name tests

    it('check if register fails with blank lastname', function() {
        browser.get(`${url}`);
    
        // get element by tag name specific to the lastname tag [1], and check if it is empty
        element(by.tagName('mat-form-field')[1]).sendKeys() == null;
        

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })



    it('check if register fails if lastname starts with a space', function() {
        browser.get(`${url}`);
    
        // get element by tag name specific to the lastname tag [1], and check if it starts with a space
        element(by.tagName('mat-form-field')[1]).sendKeys(' bobby');
        

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })



    it('check if register fails if lastname is greater than 50 characters', function() {
        browser.get(`${url}`);
    
        // get element by tag name specific to the lastname tag [1], and check if it is bigger than 50
        element(by.tagName('mat-form-field')[1]).getSize() > 50;
        

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })


})