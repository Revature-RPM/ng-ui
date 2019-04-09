import { browser } from "protractor";
import { element } from "@angular/core/src/render3";




// What we plan to test
// blanks, invalid input, length, special characters


describe('Test Register', function() {

    let url = 'http://rpmclient.revature.com.s3-website-us-west-2.amazonaws.com/';

    it('check if register works with valid inputs', function() {

        browser.get(`${url}`);
        // grab the elements that holds the input for username/ firstname/ lastname/ password/ email
        // get these elements and then test the .sendKeys for each element
        
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();
        
        // specifiy what url we are wanting to hit after this action is performed
        expect(browser.getCurrentUrl(`${url}login`));

        // 
        

        
        

    })


    // test to see if the registration was successful or not
    it('check if register fails with all blank inputs', function() {
        browser.get(`${url}`);
    
        // get these elements and then test the .sendKeys for each element
        
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })



    // test to see if the registration was successful or not
    it('check if register fails with blank email', function() {
        browser.get(`${url}`);
    
        // get element by tag name specific to the email tag [2], and check if it is empty
        element(by.tagName('mat-form-field')[2]).sendKeys() == null;

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })


     // test to see if the registration was successful or not
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


    // test to see if the registration was successful or not
    it('check if register fails with blank username', function() {
        browser.get(`${url}`);
    
        // get element by tag name specific to the username tag [3], and check if it is empty
        element(by.tagName('mat-form-field')[3]).sendKeys() == null;
        

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })

    // test to see if the registration was successful or not
    it('check if register fails with blank firstname', function() {
        browser.get(`${url}`);
    
        // get element by tag name specific to the firstname tag [0], and check if it is empty
        element(by.tagName('mat-form-field')[0]).sendKeys() == null;
        

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })


    // test to see if the registration was successful or not
    it('check if register fails with blank lastname', function() {
        browser.get(`${url}`);
    
        // get element by tag name specific to the lastname tag [1], and check if it is empty
        element(by.tagName('mat-form-field')[1]).sendKeys() == null;
        

        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();

         // specifiy what url we are wanting to hit after this action is performed
         expect(browser.getCurrentUrl(`${url}login`));

    })






})