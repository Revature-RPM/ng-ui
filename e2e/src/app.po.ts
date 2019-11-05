import { browser, by, element } from 'protractor';

export class AppPage {

  //the home page
  navigateToHome() { return browser.get('/home'); }
  getButtonText() { return element(by.className('btn')).getText(); }
  getNavbar1() { return element(by.id('itemMenu')).getText(); }
  getNavbar2() { return element(by.id('subMenu')).getText(); }
  getNavbar3() { return element(by.id('subItemMenu')).getText(); }

  //the login/register page
  navigationToLogin() { return browser.get('/login'); }
  getLoginPageEvidence() { return element(by.css('app-login-register-page h2')).getText(); }
  fillLoginUser() { element(by.id('username-input')).sendKeys('username'); }
  fillLoginPass() { element(by.id('password-input')).sendKeys('password'); }
  pressButton() { element(by.className('mat-flat-button mat-accent')).click(); }

  //the project submition page
  navigationToProjectSubmission() { return browser.get('/project-submission'); }
  getProjSubPageEvidence() { return element(by.css('app-project-submission-page h1')).getText(); }
  fillProjectName() { element(by.id("project-name")).sendKeys("Fake Project"); }
  fillProjectBatch() { element(by.id("project-batch")).sendKeys("3rd Batch Java"); }
  fillProjectTrainer() { element(by.id("project-trainer")).sendKeys("Nick"); }
  fillProjectStack() {
    const stackOptions = element(by.id("project-stack")).then((stackOptions) => { 
      stackOptions[2].click();
    });
  }
  fillProjectMembers() { 
    const result = element(by.id('group-members'));
    result.getAttribute('value')
    element(by.id('group-members')).getAttribute('value').then(() => {

    });
  }
}




	// it('should go end to end and add a project', () => {
	// 	browser.get('http://localhost:4200/submitform');
	// 	element(by.id("project-name")).sendKeys("Fake Project");
	// 	element(by.id("project-batch")).sendKeys("3rd Batch Java");
	// 	element(by.id("project-trainer")).sendKeys("Nick");
	// 	var stackOptions = element(by.id("project-stack"))
	// 		.then((stackOptions) => {
	// 			stackOptions[2].click();
	// 		}
	// 	)
	// 	var result = element(by.id('group-members'));
	// 	expect(result.getAttribute('value')).toEqual(['Mike', 'Molly', 'Sam']);
	// 	element(by.id("descriptionArea")).sendKeys("This is a fake project for testing");
	// 	element(by.id("inputGithubLink")).sendKeys("https://github.com/NicoloPerrelli/revtaroomapi");
	// 	element(by.id("submit")).click();
		
	// 	var list = element(by.id("project-list-tabs"))
	// 	expect(list.getSize).toBeTruthy();
	// })