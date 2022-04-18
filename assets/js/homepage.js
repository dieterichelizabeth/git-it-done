// Variable reference to the "form" element
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

// Variable reference to the "show repositories" element
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// Variable for "language" buttons
var languageButtonsEl = document.querySelector("#language-buttons");

// Form Submit Function
var formSubmitHandler = function (event) {
  event.preventDefault();

  // Get value from input element and store it in "username" variable
  var username = nameInputEl.value.trim();

  // If there is value- pass the data as an argument to getUserRepos()
  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  }
  // Else, the window alerts to enter a username
  else {
    alert("Please enter a GitHub username");
  }
};

// user parameter w/in the getUserRepos function
var getUserRepos = function (user) {
  // Format the Github Api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // Makes a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // If the request was successful- pass the response and user to displayRepos()
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert("Error: GitHub User Not Found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub");
    });
};

var buttonClickHandler = function (event) {
  var language = event.target.getAttribute("data-language");

  // Pass the language as an arugment to the getFeaturedRepos function
  if (language) {
    getFeaturedRepos(language);
    repoContainerEl.textContent = "";
  }
};

var getFeaturedRepos = function (language) {
  // Format the Github Api url
  var apiUrl =
    "https://api.github.com/search/repositories?q=" +
    language +
    "+is:featured&sort=help-wanted-issues";

  // Make a get request to url
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert("Error: GitHub User Not Found");
    }
  });
};

var displayRepos = function (repos, searchTerm) {
  // Check if api returned any repos
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }

  // Clear old content before diplaying new content!
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  // Loop over repos
  for (var i = 0; i < repos.length; i++) {
    // Format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // Create a link for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // Link w/ query to change page and keep repoName variable
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    // Create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // Create a status element (adds the number of issues to each html item)
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // If the current repo has open issues, display the count
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issue(s)";
    }

    // Else, display a blue checkmark
    else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // Append newly created elements
    repoEl.appendChild(titleEl);
    repoContainerEl.appendChild(repoEl);
    repoEl.appendChild(statusEl);
  }
};

userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);
