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
            console.log(data);
          });
        }
        else {
          alert("There was a problem with your request!");
        }
      });
  };
  
// display all the issues associated with that repository.

  getRepoIssues("facebook/react");