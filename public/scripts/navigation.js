// public/scripts.js
console.log("navigation.js");
let currentLocation = window.location.pathname;
// console.log(currentLocation);

const home = document.getElementById("home");
const account = document.getElementById("account");
const logo = document.getElementById("logo");

if (currentLocation == "/account") {
  account.style.backgroundColor = "yellow";
}
if (currentLocation == "/") {
  home.style.backgroundColor = "yellow";
}

logo.addEventListener("click", () => {
  window.location.pathname = "/";
});

// logout function going to delete the all localstorage items
const logout = () => {
  localStorage.clear();
};
