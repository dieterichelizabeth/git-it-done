// reference to the issues container
var issueContainerEl = document.querySelector("#issues-container");

// reference to limit warning container
var limitWarningEl = document.querySelector("#limit-warning");

// make a request to the GitHub API with a repository's name
var getRepoIssues = function(repo) {
    // request for indidivual issues (as the endpoint) with appended direction
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    // fetch request passing variable apiURL (which holds the query)
    fetch(apiUrl).then(function(response) {
        // request was successful 
        if (response.ok) {
          // (use the pormise syntax to access the data contained)  
          response.json().then(function(data) {
            // pass response data to dom function
            displayIssues(data);
            
            // check if api has paginated issues
            if (response.headers.get("Link")) {
                displayWarning(repo);
            }
          });
        }
        else {
          console.log(response);
          alert("There was a problem with your request!");
        }
      });
  };
  
// display all the issues associated with that repository.
var displayIssues = function(issues) {

    // check if there are open issues in the repository
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
      }

    // loops over the response data to create <a> elements
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        // opens the link at a new tab instead of replacing the current webpage
        issueEl.setAttribute("target", "_blank");
    
        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
        typeEl.textContent = "(Pull request)";
        } else {
        typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
}
};

// display warning function (more than 30 issues)
var displayWarning = function(repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    // create link element
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");
  
    // append to warning container
    limitWarningEl.appendChild(linkEl);
  };

getRepoIssues("facebook/react");