/*
PsuedoCoding
Step 1: create funtion getUserRepos to fetch data from the 
    Github API and return JSON data
Step 2: create function formSubmitHandler to 
    recieve data from form submission and return through get User Repos
Step 3: create function displayRepos to display both the repos list and search term
    then create a for loop within the funciton to diplay the results in html
Step 4: add if statements to the getUserRepos function to 
    - check the username is valid via Github's API (404 response)
    - check if the user has repositories
    - catch network errors
Step 5: Collect user input to form HTTP requests.
    Step 5.1: add div classes to the html sheet
            - style columns 
                - one for the search form
                - the other for results
    Step 5.2: add an event listener to the form HTML element to execute a function on submission
    Step 5.3: create function FormSubmitHandler to execute form submission on browser event
    Step 5.4: add event listener to userFormEl
            - have the function get the value of the form input element and send it over to getUserRepos();
                - Essentially, when we submit the form, we get the value from the inpus element via nameInputEl DOM
                variable, then store the value in its own variable called "username". We use the trim to shave off 
                extra space which the user may have input. If there is value to the username input, we pass that data to
                getUserRepos as an argument. Then we clear the input element's value.
    Step 5.5: capture the form's input data to use elsewhere in the app
            - create variables userFormEl and name Input El with id's to the HTML
    Step 5.6: A lot of HTTP requests to server-side APIs receive responses with way more JSON data than necessary. 
            - we need need to know the username, the repository name, and how many issues the repository has
            - You can liken an API endpoint to a function in the sense that the same base URL 
              can return different data depending on the argument(s) given.
            - study the response data so that we can identify the properties we want to use
            - the response itself is an array of objects, with each object holding one repository's data!
            - identify how the details we need are labeled in the response data.
    Step 5.7: Create a for loop and use DOM functionality within a new function (displayRepos)
            - accept both the array of repository data and the term we searched for as parameters
            - send data from the getUserRepos to displayRepos
            - add to the HTML (h2, span+id, and empty div+id)
                - add jS variables to reference the DOM elements (repoContainerEl and repoSearchTerm)
Step 6: Use an HTTP request's response to display data to the user.
    Step 6.1: clear old content before displaying new content (in displayRepos)
    Step 6.2: add the for loop which
            - formats the repo name, creates a container (div) for each repo
            - creates a span element to hold repo names
            - append statements for both elements
    Step 6.3: add the number of issues for each repository
            - add a conditional statement to see if a current repo has issues or not
                - if the # of issues is greater than 0, display red "x" with # of issues
                    - OR if no issues exist, display a blue check mark
Step 7: Handle errors that may occur when working with Github's API
    Step 7.1: add a fetch method to the getUserRepos function so that if a user searches for something
              which does not exist, then they will be prompted with an alert
            - resonse.ok= when the HTTP request status code is something in the 200s, the ok property will be true.
    Step 7.2: If a GitHub user exists but doesn't have any repos, there will be nothing to display
            - use another conditional statement to check if an empty array is returned (no repositories)
            - if an empty array is returned, we alert the user
    Step 7.3: Catching Newtowrk Errors
            - use the .catch method to check if the request fails- if so, the user is alerted
Step 8: 

- Set up the HTML and jS files
- convert the API fetch data response into DOM elements
- add extra message when a repo has more than 30 issues
*/
