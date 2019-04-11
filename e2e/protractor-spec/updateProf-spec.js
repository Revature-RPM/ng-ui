import { getDefaultService } from "selenium-webdriver/chrome";

/**
 * @author Abe,Mitchell,Omar,Thanh,Zachary
 */

let url = 'http://rpmclient.revature.com.s3-website-us-west-2.amazonaws.com/';
//We use the before all function so that a user is logged in for these tests.
    beforeAll(function(){
        browser.get(`${url}`);
        element(by.id('mat-input-0')).sendKeys('Tester');
        element(by.id('mat-input-1')).sendKeys('McTesterson');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();
        
    })
    let id = localStorage.getItem('user').id;
    // after we update the user we want to get this user from the database and make sure the the changes we persisted.
    async function getUser(){
        let response = await fetch( `id/${id}`,{
         method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
            
        });
        return JSON.parse(response.body);
        }

    //This will test the persistance of the update user function
    describe('This tests the update Profile function', function(){
        it('Should update the user ')
        {
            
            browser.get(`${url}`);
            
             element(by.id('inputFirstName')).sendKeys('Demo');
             element(by.id('inputLastName')).sendKeys('McDemoson');
            element(by.id('inputEmail')).sendKeys('demo@revature.com');
            element(by.id('Username')).sendKeys('TheDemo');
            element(by.id('currInputPassword')).sendKeys('Demo');
           element(by.id('inputPassword')).sendKeys('Demo');
           var myButton = element(by.buttonText('Save'));
           myButton.click();
           browser.waitForAngular();
           let user = getUser();
           let myUser = {id: id, firstName: 'Demo', lastName:'McDemoson',email:'demo@revature.com'
            ,username: 'TheDemo', password:'Demo'};
            expect(myUser.toEqual(user));
            

        }
    })



    afterAll(function(){
        var myButton = element(by.buttonText('Logout'));
        myButton.click();
     })