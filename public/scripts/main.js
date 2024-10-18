/* public/scripts/main.js */

console.log("this is main.js");
deleteBtn.addEventListener("click", () => {
  let fileName = "mahavir";
  let text;
  let value;

  if (confirm(`Do you really want to delete this "${fileName}" link?`)) {
    text = "You deleted this file from your database.";
    value = true;
    console.log(text);
  } else {
    text = "You canceled the deletion.";
    value = false;
    console.log(text);
  }

  if (value === true) {
    console.log("Deletion confirmed.");
  } else {
    console.log("Deletion canceled.");
  }
});

shareBtn.addEventListener("click", () => {
  console.log("sharebtn clicked");
});

updateBtn.addEventListener("click", () => {
  console.log("updatebtn clicked");
});
