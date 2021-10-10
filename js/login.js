const form = document.forms.signIn;
const ERROR_LOGIN = "Invalid Username or Password!";

if (localStorage.getItem("loginStatus") === "true") {
  window.location = "./orders.html";
}

const loginApi = async (user) => {
  const URI =
    "https://6146b71b8f2f4e00173040bf.mockapi.io/login?username=" + user;
  const response = await fetch(URI);
  return response.json();
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = form.elements["username"]?.value;
  const password = form.elements["password"]?.value;
  loginApi(username)
    .then((data) =>
      data.length !== 0
        ? validateLogin(data, username, password)
        : alert(ERROR_LOGIN)
    )
    .catch((err) => console.log(err));
});

const validateLogin = (data, user, pass) => {
  data?.map((it) => {
    if (it.username === user && it.password === pass) {
      localStorage.setItem("loginStatus", true);
      window.location = "./orders.html";
    } else {
      alert(ERROR_LOGIN);
    }
  });
};
