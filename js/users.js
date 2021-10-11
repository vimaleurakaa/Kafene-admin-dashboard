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

  $(".user_search_filed").on("input", function (e) {
    e.preventDefault();
    const searchText = $(this).val().toLowerCase();

    const filterData = userData.filter((it) => {
      const name = it.fullName?.toLowerCase();
      if (name.search(searchText) !== -1) {
        return it;
      }
    });
    if (filterData.length !== 0) usersDisplay(filterData);
    else noResult();

    if ($(this).val() === "") {
      usersDisplay(userData);
    }
  });

  $(".search_reset").click(function (e) {
    e.preventDefault();
    $(".user_search_filed").val("");
    getUserData();
  });

  $("#logout").click(function () {
    localStorage.setItem("loginStatus", false);
    window.location = "./index.html";
  });
});
