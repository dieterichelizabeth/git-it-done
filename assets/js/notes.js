/*
Project goals:
Use the fetch API to send requests to a server-side API
Receive and parse data in the JSON format
Use returned data to dynamically generate HTML
Handle response codes and metadata, including headers, status, and URL
*/

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

--- BREAK: We want to create a seccond page which displays the open issues for a user's repo once clicked
Step 1: Create the new HTML/jS files (single-repo.html, and single.js)
Step 2: Fetch the API data
    Step 2.3: create getReopIssues function to take a repo name as a parameter
            - request for indidivual issues (as the endpoint) with appended direction
Step 3: Convert API fetch data response into DOM elements
    Step 3.1: create function displayIssues to display the issues
            - in getRepoIssues: use conditional statment to check request was successful
                - pass the data to a dom function
            - in displayIssues create a for loop to loop over the repsponse data and create <a> elements for each issue
                - the data for issues has a html_url property which links to the issue on Github
            - double check the properties of data recieved
    Step 3.2: create a span for the title, append to container
    Step 3.4: create an element, use conditional statemenet to check if it is an issue or pull request, append element
            - create a reference to the issues container (to display appended elements)
            - add the container element/append child before the for loop!
    Step 3.5: add a alert for no open issues
Step 4: add extra message when a repo has more than 30 issues
            - we can't view more than 30 at a time due to pagination (Github limits results- cost effective)
            - however, we can see if there is an HTTP header in the response by console.log((response.headers.get("Link"));
    Step 4.1: create a new container in the HTML (div)
    Step 4.2: create a DOM reference to the container limitWarningEl
    Step 4.3: create displayWarning function w/ repo parameter to display a text warning
            - append link element w/ href attribute pointing to the HTTP link

--- BREAK: We want to add the ability click on a repo name from the list, and a new page loads w/ open issues
Step 1. Pass information from one page to another using query parameters
    Step 1.1: create a link between pages
            - in the homepage.js file, change the create div element in the for loop of displayRepos to a <a> element w/ link
                - link takes you to the single-repo html
            - adjust the href to contain the query parameter, the selected repo's name (already stored in repoName)
                - this will change the URL in the address bar - not quite there yet.
Step 2: Obtain data from a URL using browser-provided location objects
    Step 2.1: Read and use data from the query parameter
            - locate the query string in the URL through jS by using document.location.search in the console
Step 3: Make the API call dynamic by using the query parameter to alter the request
    Step 3.1: in single.js, extract the query value from the query string in the API call function getRepiIssues
            - create a new function getRepoNames
            - remove the hardcoded function call for getRepoIssues
            - use the location object and split method to extract the repo name from the query string
    Step 3.2: pass the repoName variable until the getReopIssues function
            - use repoName to fetch the related issues from the Github API issues endpoint
            - add reponame to the header of the page by targeting the span id repo-name through variable repoNameEl
            - in the getRepoName- add repoNameEl.textContent = repoName to update the element's text content
Step 4: Error handling
    Step 4.1: If a query parameter is unavailable, we should redirect the user back to the index.html page to try entering a username again.
            - add a conditional statement to getRepoName to check that valid values exist 
              before passing to their respective function calls
                - The preceding conditional statement will only display the repo name 
                and make the fetch call if the value for repoName exists.
                - if no reponame exists, the .replace method will take the user back to the homepage
            - By checking to see if the query parameter is available, we can preempt a potential error 
              before it ever reaches the API call.
    Step 4.2: Change the alert in the getRepoIssues to the .replace method to prevent the API call from being reached

--- BREAK We want to add buttons which allow the user to filter the repo by programming language
Step 1: Create a function to call the Github Search API
    Step 1.1: in homepage.js, create a new function that accepts a language parameter, creates an API endpoint,
              and makes an HTTP request to that endpoint using fetch()
            - test the feature by typing getFeaturedRepos("javascript"); in the console
            - add the then method and log response to the console
            - add error handling for bad responses
    Step 1.2: since the reponse comes back as the HTTP, use a json method to extract JSON from the response
Step 2: Display the API data on the page
    Step 2.1: pass data.items and language to the displayRepos function
            - call getFeaturedRepos("javascript"); in the console to make sure it's working- success!
Step 3: Add language buttons in the HTML
    Step 3.1: Below the <div> that holds the <form> element in the left column, 
             create another <div> element with a class attribute value of card. 
            -That left column should now have two <div> elements with a class of card.
    Step 3.2: Inside that <div>, create an <h3> element with text content that says "Search By Topic". 
            - Give it a class attribute with two values: card-header and text-uppercase.
    Step 3.3: Right underneath the <h3> element, create another <div>, with a class attribute of card-body and 
              an id attribute of language-buttons.
            - make three button elements for jS, HTML, and CSS
                - give each a class attribute vale of btn
                - and a data attribute called data'language, with a value of the topic the button will
                  search for when clicked. Make the value lowercase
Step 4: Call the API function when buttons are clicked in the homepage.js
    Step 4.1: add the variable to store the language button id
    Step 4.2: add an event listener to the div element 
    Step 4.3: create a function (buttonClickHandler) with event delegation 
            - accepts an event as a parameter
            - create a variable language with a value of event.target.getAttribute("data-language")
    Step 4.4: call the getFeaturedRepos function
            - clear old content in the container
*/

/* 
Terms/concepts:
Client-side API vs. server-side API
Client-server model and request-response pattern
Implement the differences between HTTP GET requests using XMLHTTPRequest, jQuery AJAX, and the fetch API
HTTP response codes and handle response metadata with fetch API
Parse JSON to dynamically generate HTML
Benefits and challenges of working with asynchronous JavaScript
Implement query string parameters
Server-side API documentation.
Use the browser's Fetch API to communicate with a server.
Inspect browser requests and server responses with the Chrome DevTools Network tab.
Pass information from one page to another with query parameters (much like you did with the GitHub API call).
Read from the query string and redirect the page with the document.location object.
Create a dynamic API call based on a user selection.
Recognize which options are available for GitHub API endpoints.
Use multiple parameters in a query string.
Use HTML attributes to dynamically update an API call.
*/