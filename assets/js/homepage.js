// variables to store a reference to the form element
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
// variables to store a reference to the show repositories element
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

//variable for language buttons
var languageButtonsEl = document.querySelector("#language-buttons");

// function to be executed upon a form submission
var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element via nameInputEl DOM variable and store it in "username" variable
    // trim helps with user submission (if the user leaves spaces in the form)
    var username = nameInputEl.value.trim();
    // check that there's a value in the username variable
    // if there is value- then we pass the data to getUserRepos() and clear the form
    if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
    } 
    // if there is NOT value (invalid username), the window alerts to enter a username
    else {
    alert("Please enter a GitHub username");
    }
    console.log(event);
  };

var buttonClickHandler = function(event) {
    var language = event.target.getAttribute("data-language");
    console.log(language.value);
    if (language) {
      // call the getFeaturedRepos function
      getFeaturedRepos(language);
    
      // clear old content
      repoContainerEl.textContent = "";
    }
  };
  

// user parameter w/in the getUserRepos function
var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // Response object in the fetch logic with method called json which formats the response
    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          displayRepos(data, user);
        });
      } else {
        alert('Error: GitHub User Not Found');
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to GitHub");
    });
};

// function which gets featured repositories based on language
var getFeaturedRepos = function(language) {
  // format the github api url
  var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

  // make a get request to url
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data.items, language);
      });
    } else {
      alert('Error: GitHub User Not Found');
    }
  });
};

// accepts both the array of repo data and the term we searched for as parameters
var displayRepos = function(repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    console.log(repos);
    console.log(searchTerm);
    // clear old content before diplaying new content!
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // For loop to loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
    
        // create a link for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // link w/ query to change page and keep repoName variable
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
    
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

    // create a status element (adds the number of issues to each html item)
    var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // use an if statement to check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        // if no issues, display a blue checkmark 
        else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
    
    /* the order of appended elements defines where the element will be placed
       (ex. titleEl goes first since you want that to the farthest right)*/
    // append to container
        repoEl.appendChild(titleEl);
    
    // append container to the dom
        repoContainerEl.appendChild(repoEl);
    
    // append to container
        repoEl.appendChild(statusEl);
  }
  };

// submit even listener
userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);

