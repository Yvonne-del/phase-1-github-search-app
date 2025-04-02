document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const repoList = document.getElementById("repos-list");
  
    // API Endpoints
    const BASE_URL = "https://api.github.com";
  
    // Search Users
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        searchUsers(query);
      }
    });
  
    // Fetch users matching the search query
    function searchUsers(query) {
      fetch(`${BASE_URL}/search/users?q=${query}`, {
        headers: { Accept: "application/vnd.github.v3+json" }
      })
        .then((response) => response.json())
        .then((data) => displayUsers(data.items))
        .catch((error) => console.error("Error fetching users:", error));
    }
  
    // Display users in the DOM
    function displayUsers(users) {
      userList.innerHTML = ""; // Clear previous results
      repoList.innerHTML = ""; // Clear previous repos
  
      users.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
          <button class="repo-btn" data-username="${user.login}">View Repos</button>
        `;
        userList.appendChild(li);
  
        // Add event listener to fetch repositories
        li.querySelector(".repo-btn").addEventListener("click", () => fetchRepos(user.login));
      });
    }
  
    // Fetch repositories for a user
    function fetchRepos(username) {
      fetch(`${BASE_URL}/users/${username}/repos`, {
        headers: { Accept: "application/vnd.github.v3+json" }
      })
        .then((response) => response.json())
        .then((repos) => displayRepos(repos))
        .catch((error) => console.error("Error fetching repositories:", error));
    }
  
    // Display repositories in the DOM
    function displayRepos(repos) {
      repoList.innerHTML = ""; // Clear previous repos
  
      repos.forEach((repo) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        repoList.appendChild(li);
      });
    }
  });
  