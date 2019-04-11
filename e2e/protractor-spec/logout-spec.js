import { browser } from "protractor";
import { element } from "@angular/core/src/render3";


/**
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus
 */
describe('Testing logout', function(){
    let url = 'http://rpmclient.revature.com.s3-website-us-west-2.amazonaws.com/';
    it('Should return to the login page', function(){
        browser.get(`${url}home`);
        var myButton = element(by.buttonText('Logout'));

        myButton.click();
        expect(localStorage.getItem('jwt')==null);
        expect(localStorage.getItem('user')==null);
        expect(browser.getCurrentUrl(`${url}`));
    });
});