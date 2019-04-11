import { browser } from "protractor";
import { element } from "@angular/core/src/render3";

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
async function getProject(){
    let response = await fetch( `name/Test Project`,{
     method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
        
    });
    return JSON.parse(response.body);
    }
describe('Tesing the submit project function', function(){

        it('Should persist a new project when submitted')
        {
            // Give values for each input field in the submit prject page
            browser.get(`${url}`);
            element(by.id('project_name')).sendKeys('Test Project');
            element(by.name('batchName')).sendKeys('Test');
            element(by.name('trainers')).sendKeys('Wezley');
            element(by.id('inputGroupMembers')).sendKeys('Abe,Mitchell,Omar,Thanh,Zachary');
            element(by.name('description')).sendKeys('This is a test project');
            element(by.id('inputGithubLink')).sendKeys('https://github.com/test/TestRepo');
            element(by.tagName('mat-select')).elementToBeSelected('Java');
            element(by.id('submit')).click();
            browser.waitForAngular();
            //get project by name to ensure that the project was persisted.
            let project = getProject();
            expect(project.name.toEqual('Test Project'));
            expect(project.batch.toEqual('Test'));
            expect(project.trainer.toEqual('Wezley'));
            expect(project.groupMembers.toEqual('Abe,Mitchell,Omar,Thanh,Zachary'));
            expect(project.description.toEqual('This is a test project'));
            expect(project.zipLinks.toEqual('https://github.com/test/TestRepo'));
            expect(project.techStack.toEqual('Java'));
            
        }
})