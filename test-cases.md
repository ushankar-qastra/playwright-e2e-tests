1. create a new spec file called `multi.window.spec.ts` under my functional folder
2. and capture the flows as below
   - navigate to the site `https://the-internet.herokuapp.com/`
   - click on "Multiple Windows" link
   - navigate to the newly opened window and assert the title
   - click the link "click here" on that new window
   - navigate to the next window that is opened
   - assert the header text
   - come back to the parent window
3. add a new key in `package.json` file
4. and run the spec in headed mode
5. make this spec file the framework compliant including the data handling and the page object model
