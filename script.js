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
  searchBox.addEventListener("input", function () {
    userList.innerHTML = "";
    data.forEach((e) => {
      if (e.login.includes(this.value.toLowerCase())) {
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
  });
};
