// file.scripts.js
console.log("file.js");

const files_sharing = document.getElementById("file-sharing");
const show = document.getElementById("show");
const fileInfo = document.getElementById("fileInfo");
const dropImg = document.getElementById("dropImg");
console.log(files_sharing);

files_sharing.addEventListener("change", (e) => {
  show.style.display = "block";
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  //   console.log(url);

  if (file) {
    const filesize = file.size / 1_000_000 + " mb";
    // console.log("file is occurred", file, file.type, file.name, filesize);
    const img = document.createElement("img");
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");

    img.src = url;
    img.alt = file.name;
    img.style.width = "300px";
    img.style.height = "300px";
    img.style.margin = "auto";
    img.style.borderRadius = "20px";
    dropImg.style.display = "none";
    files_sharing.style.display = "none";

    li1.innerHTML = file.name;
    li2.innerHTML = filesize;
    li3.innerHTML = file.type;

    fileInfo.append(li1);
    fileInfo.append(li2);
    fileInfo.append(li3);
    show.append(img);
  }
});
