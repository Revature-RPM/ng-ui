import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('home page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should get to page and find the view projects button', () => {
    page.navigateToHome();
    // browser.pause();
    expect(page.getButtonText()).toEqual('View Projects');
  });

  it('should open the burgar bar', () => {
    page.navigateToHome();
    expect(page.getNavbar1()).toEqual('Probably not this');
    expect(page.getNavbar2()).toEqual('Probably not this');
    expect(page.getNavbar3()).toEqual('Probably not this');
  });

});

describe('login/regiser page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigationToLogin();
  });

  it('should be on login', () => {
    expect(page.getLoginPageEvidence()).toEqual('REVATURE PROJECT MANAGER');
  });

  it('should fill bad info and send an auth request and fail', () => {
    page.fillBadLoginUser();
    page.fillBadLoginPass();
    page.pressButton();
    //more code to make sure it was rejected
  });

  it('should fill the login and send an auth request', () => {
    page.fillLoginUser();
    page.fillLoginPass();
    page.pressButton();
    //more code to make sure it has been aproved
  });
});

describe('Project Submition page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigationToProjectSubmission();
  });

  it('should be on page', () => {
    expect(page.getProjSubPageEvidence()).toEqual('SUBMIT A PROJECT');
  });

  it('should make a bad submit and all errors throw', () => {
    page.submitProjectForm();
    expect(page.getErrorSubPageEvidence()).toBe(' Project name has problems. Batch name has problems. '+
                                                'Trainer name has problems. Group members has problem. '+
                                                'Description has problem. Github link has problems.');
    page.fillProjectName();
    page.submitProjectForm();
    expect(page.getErrorSubPageEvidence()).toBe(' Batch name has problems. '+
                                                'Trainer name has problems. Group members has problem. '+
                                                'Description has problem. Github link has problems.');
  });

  it('should make a good submition', () => {
    page.fillProjectName();
    page.fillProjectBatch();
    page.fillProjectTrainer();
    page.fillProjectStack();
    page.fillProjectMembers();
    page.fillProjectDescription();
    page.fillProjectZipLink();
    page.submitProjectForm();
    //might need something to wait for page change
    page.getSuccessfulProjectSubmit();
  });
});