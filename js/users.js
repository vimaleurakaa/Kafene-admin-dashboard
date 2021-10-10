$(document).ready(function () {
  if (
    localStorage.getItem("loginStatus") == null ||
    localStorage.getItem("loginStatus") === "false"
  ) {
    alert("Please login first");
    window.location = "./index.html";
  }

  let userData = [];

  const getUserData = () => {
    fetch("https://a-todo-app-default-rtdb.firebaseio.com/kafen-users.json")
      .then((response) => response.json())
      .then((data) => {
        userData = data;
        usersDisplay(data);
      })
      .catch((err) => console.log(err));
  };

  getUserData();

  const usersDisplay = (data) => {
    let usersDetails = "";
    for (let i = 0; i < data.length; i++) {
      usersDetails += `<tr>
    <td class="id">${data[i].id}</td>
    <td><img src="${data[i].profilePic}" /></td>
    <td class="dark_text">${data[i].fullName}</td>
    <td class="grey_text">${data[i].dob}</td>
    <td class="dark_text">${data[i].gender}</td>
    <td class="dark_text">${data[i].currentCity}, ${data[i].currentCountry}</td>
</tr>`;
    }

    $("#ordersBody").html(usersDetails);
  };

  const noResult = () => {
    let noResultText = `<p class="noResult text-danger fw-bold">No Result Found</p>`;
    $("#ordersBody").html(noResultText);
  };

  $(".search_submit").click(function (e) {
    e.preventDefault();
    let searchText = $(".user_search_filed").val().toLowerCase();
    if (searchText.length < 2) {
      alert("Please enter at least 2 characters");
      return;
    } else {
      const filterData = userData.filter((it) => {
        const name = it.fullName?.toLowerCase();
        if (name.search(searchText) !== -1) {
          return it;
        }
      });
      if (filterData.length !== 0) usersDisplay(filterData);
      else noResult();
    }
  });

  $(".search_reset").click(function (e) {
    e.preventDefault();
    $(".user_search_filed").val("");
    getUserData();
  });

  $(".user_search_filed").on("input", function () {
    if ($(this).val() === "") {
      usersDisplay(userData);
    }
  });

  $("#logout").click(function () {
    localStorage.setItem("loginStatus", false);
    window.location = "./index.html";
  });
});
