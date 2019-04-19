

/**
 * //We use the before all function so that a user is logged in for these tests.
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus (190107-Java-Spark-USF)
 */
let url = 'http://tn-rpm-test.s3-website-us-east-1.amazonaws.com/';
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

/**
 * ensure proper submision of projects by users, and that they client is routed properlly after submission
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus (190107-Java-Spark-USF)
 */
describe('Tesing the submit project function', function(){
    it('Should persist a new project when submitted',function() {
        // Give values for each input field in the submit prject page
        //got to the home page
        browser.get(`${url}home`);
        //then go to the sub,it project page
        browser.get(`${url}project_submission`)
        // get all of the input elements and give them valid values. then we submit the prject and make sure that the project
        //was persisted properly.
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