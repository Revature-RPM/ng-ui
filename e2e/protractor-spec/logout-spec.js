import { browser } from "protractor";
import { element } from "@angular/core/src/render3";


/**
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus
 */
describe('Testing logout', function(){
    it('Should return to the login page')
    {
        browser.get('http://rpmclient.revature.com.s3-website-us-west-2.amazonaws.com/home');
        var myButton = element(by.buttonText('Logout'));
        myButton.click();
        expect(browser.getCurrentUrl('http://rpmclient.revature.com.s3-website-us-west-2.amazonaws.com/home'));
    }
})