/**
 * Tests regarding to updating users' projects
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus (190107-Java-Spark-USF)
 */

let url = "http://tn-rpm-test.s3-website-us-east-1.amazonaws.com/";

// beforeAll function logs in a user for these tests
beforeAll(function() {
  browser.get(`${url}`);
  element(by.id("mat-input-0")).sendKeys("test-user");
  element(by.id("mat-input-1")).sendKeys("test");
  browser
    .actions()
    .sendKeys(protractor.Key.ENTER)
    .perform();
  browser.waitForAngular();
});

/**
 * test the users ability to update an existing project
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus (190107-Java-Spark-USF)
 */
describe("This tests the update project function", () => {
  // after we update project we want to get this user from the database and make sure the changes are persisted
  async function getProject() {
    // attempting to get the project by Id?

    let response = await fetch(`name/Test Project`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return JSON.parse(response.body);
  }

/**
 * testing the ability for the user to update an existing project
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus (190107-Java-Spark-USF)
 */
  describe("Testing the update project function", () => {
    it("should persist the updated function when triggered", () => {
      // give values for each input field in update project page
      browser.get(`${url}home`);
      browser.get(`${url}:id/edit`);

      // retrieving fields of update project

      element(by.id("project_name")).sendKeys("Testing projectName");
      element(by.name("batchName")).sendKeys("Testing batchName");
      element(by.name("trainers")).sendKeys("Testing Wezley");
      element(by.name("hello")).sendKeys("Abe, Mitchell, Omar, Thanh, Zachary");
      element(by.name("description")).sendKeys(
        "This is a test for updating description"
      );
      // inputGithubLink not found in html; check back later

      // capturing submit button
      browser.waitForAngular(() => {
        element(by.id("submit-update")).click();
      });

      browser.waitForAngular(() => {
        let project = getProject();
        expect(project.name).toEqual("Testing projectName");
        expect(project.batch).toEqual("Testing batchName");
        expect(project.trainers).toEqual("Testing Wezley");
        expect(project.hello).toEqual("Abe, Mitchell, Omar, Thanh, Zachary");
        expect(project.description).toEqual(
          "This is a test for updating description"
        );
        // ziplinks would correspond to github link; check back later
      });
    });
  });
});
