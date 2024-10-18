/* public/scripts/main.js */
const deleteBtn = document.getElementById("deleteBtn");
const shareBtn = document.getElementById("shareBtn");
const updateBtn = document.getElementById("updateBtn");

console.log("this is main.js");

// Check if deleteBtn exists before adding event listener
if (deleteBtn) {
  deleteBtn.addEventListener("click", () => {
    const fileName = "mahavir";
    const confirmDeletion = confirm(
      `Do you really want to delete this "${fileName}" link?`
    );

    if (confirmDeletion) {
      console.log("You deleted this file from your database.");
      console.log("Deletion confirmed.");
      // Here you might want to add code to actually delete the file from the database
    } else {
      console.log("You canceled the deletion.");
      console.log("Deletion canceled.");
    }
  });
}

// Check if shareBtn exists before adding event listener
if (shareBtn) {
  shareBtn.addEventListener("click", () => {
    console.log("shareBtn clicked");
    // Add your sharing logic here
  });
}

// Check if updateBtn exists before adding event listener
if (updateBtn) {
  updateBtn.addEventListener("click", () => {
    console.log("updateBtn clicked");
    // Add your update logic here
  });
}
