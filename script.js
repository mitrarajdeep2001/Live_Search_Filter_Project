// Constants
const userList = document.querySelector("#user-list");
const searchBox = document.getElementById("search-box");

// Fetch and display user data
const getUserData = async () => {
  try {
    const response = await fetch("https://api.github.com/users");
    const data = await response.json();
    getSearchedUserData(data);
    userList.innerHTML += data
      .map((e) => {
        return ` <li>
            <div id="user-data">
                <img src="${e.avatar_url}" alt="profile_pic">
                <div>
                <p>${e.login}</p>
                <a href="${e.html_url}" target="_blank">${e.html_url}</a>
                </div>
            </div>
        </li>`;
      })
      .join("");
  } catch (error) {
    console.log(error);
  }
};

getUserData();

// Get searched user data
const getSearchedUserData = (data) => {
  const optimisedFunction = myDebounce(data, 400)
  searchBox.addEventListener("input", optimisedFunction);
};

// Debounce function for search results
function myDebounce(data, delay) {
  let timer;
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      userList.innerHTML = "";
      data.forEach((e) => {
          if (e.login.toLowerCase().includes(this.value.toLowerCase())) {
          userList.innerHTML += ` <li>
                  <div id="user-data">
                      <img src="${e.avatar_url}" alt="profile_pic">
                      <div>
                      <p>${e.login}</p>
                      <a href="${e.html_url}" target="_blank">${e.html_url}</a>
                      </div>
                  </div>
              </li>`;
        }
      });
    }, delay)
  }
}