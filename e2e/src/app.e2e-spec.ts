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
  });

  it('should be on login', () => {
    page.navigationToLogin();
    expect(page.getLoginPageEvidence()).toEqual('REVATURE PROJECT MANAGER');
  });

  it('should fill the login and send an auth request', () => {
    page.navigationToLogin();
    page.fillLoginUser();
    page.fillLoginPass();
    page.pressButton();
  });
});
