/*auth.scripts.js*/

const password = document.getElementById("password");
const loginForm = document.getElementById("loginForm");

/*loginButton button is used to change path to login page*/
const loginButton = () => {
  location.href = "/login";
};
/*showPassword function is used for hiding and showing password type & icons*/
const showPassword = () => {
  if (password.type === "password") {
    password.type = "text";
    showpass.src = "/icons/hidePassword.svg";
  } else {
    password.type = "password";
    showpass.src = "/icons/password.svg";
  }
};

const logout = () => {
  localStorage.clear();
};


/* login form */

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Please enter your credentials for login.");
  } else {
    Toastify({
      text: "Login successful!",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        borderRadius: "12px",
      },
    }).showToast();

    // remember to add here jwt token
    const token = email + " " + password;
    localStorage.setItem("authToken", token);
  }
});
