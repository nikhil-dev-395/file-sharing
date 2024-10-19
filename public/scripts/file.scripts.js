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
  console.log(file);

  const url = URL.createObjectURL(file);
  //   console.log(url);

  if (file) {
    const filesize = file.size / 1_000_000 + " mb";
    // console.log("file is occurred", file, file.type, file.name, filesize);
    const img = document.createElement("img");

    // embed is going to show the .pdf
    const embed = document.createElement("embed");

    // iframe is going to show the .docx (google docs)
    const iframe = document.createElement("iframe");

    // li elemets for showing the metadata of files
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");

    // PDF File Handling
    if (file.type === "application/pdf") {
      embed.src = url;
      embed.type = "application/pdf";
      embed.style.width = "280px";
      embed.style.height = "300px";
      embed.style.margin = "auto";
      show.append(embed);
    }

    // images handling from here ...
    if (file.type === "image/png" || file.type === "image/jpg") {
      img.src = url;
      img.alt = file.name;
      img.style.width = "200px";
      img.style.height = "300px";
      img.style.margin = "auto";
      img.style.borderRadius = "20px";
      show.append(img);
    }


    // NOTE : DOCX CREATING A ISSUE FOR PREVIEWING IT .SOLVE THIS FIRST
    // docx handling from here ..
    if (
      file.type ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      iframe.src = `https://docs.google.com/gview?url=${encodeURIComponent(
        url
      )}&embedded=true`;
      iframe.style.width = "280px";
      iframe.style.height = "300px";
      iframe.style.margin = "auto";
      show.append(iframe);
    }
    // making drop img hidden after choosing the file
    dropImg.style.display = "none";
    files_sharing.style.display = "none";

    // appending the elements in `show` name id div
    li1.innerHTML = file.name;
    li2.innerHTML = filesize;
    li3.innerHTML = file.type;

    fileInfo.append(li1);
    fileInfo.append(li2);
    fileInfo.append(li3);
  }
});
