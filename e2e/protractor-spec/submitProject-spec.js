

/**
 * @author Abe,Mitchell,Omar,Thanh,Zachary
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
    it('Should persist a new project when submitted',function() {
        // Give values for each input field in the submit prject page
        browser.get(`${url}home`);
        browser.get(`${url}project_submission`)
        element(by.id('project_name')).sendKeys('Test Project');
        element(by.name('batchName')).sendKeys('Test');
        element(by.name('trainers')).sendKeys('Wezley');
        element(by.id('inputGroupMembers')).sendKeys('Abe,Mitchell,Omar,Thanh,Zachary');
        element(by.name('description')).sendKeys('This is a test project');
        element(by.id('inputGithubLink')).sendKeys('https://github.com/test/TestRepo');
        element(by.id('submit')).click();
        browser.waitForAngular(
            function(){
            let project = getProject();
            expect(project.name).toEqual('Test Project');
            expect(project.batch).toEqual('Test');
            expect(project.trainer).toEqual('Wezley');
            expect(project.groupMembers).toEqual('Abe,Mitchell,Omar,Thanh,Zachary');
            expect(project.description).toEqual('This is a test project');
            expect(project.zipLinks).toEqual('https://github.com/test/TestRepo');
            expect(project.techStack).toEqual('Java');
            }
        );
        //get project by name to ensure that the project was persisted.
         
    });
});