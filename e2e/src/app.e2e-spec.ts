import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should get to page', () => {
    page.navigateTo();
    // browser.pause();
    expect(page.getParagraphText()).toEqual('View Projects');
  });
});
