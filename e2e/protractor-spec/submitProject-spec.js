import { browser } from "protractor";
import { element } from "@angular/core/src/render3";

/**
 * @author Abe,Mitchell,Omar,Thanh,Zachary
 */
let url = 'http://rpmclient.revature.com.s3-website-us-west-2.amazonaws.com/';
describe('Tesing the submit project function', function(){

        it('Should persist a new project when submitted')
        {
            browser.get(`${url}`);
            element(by.id('project_name')).sendKeys('Test Project');
            element(by.name('batchName')).sendKeys('Test');
            element(by.name('trainers')).sendKeys('Wezley');
            element(by.id('inputGroupMembers')).sendKeys('Abe,Mitchell,Omar,Thanh,Zachary');
            element(by.name('description')).sendKeys('This is a test project');
            element(by.id('inputGithubLink')).sendKeys('https://github.com/test/TestRepo');
            element(by.tagName('mat-select')).elementToBeSelected('Java');
            element();
        }
})