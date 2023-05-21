const getAlbum = (id) => {
  let artistSection = document.querySelector(`#${id}`);
  let albumList = document.querySelector(`#${id}Section`);

  const modalUl = document.querySelector(".modal-body ul");
  // console.log(modalUl);

  function processedAlbum(albums) {
    const displayedAlbums = [];

    for (let i = 0; i < albums.length; i++) {
      let singleEl = albums[i];
      let albumTitle = singleEl.album.title;

      if (!displayedAlbums.includes(albumTitle)) {
        displayedAlbums.push(albumTitle);

        let modalLi = document.createElement("li");
        modalUl.appendChild(modalLi);
        modalLi.classList.add("my-2");
        modalLi.innerHTML += "<a>" + albumTitle + "</a>";

        modalLi.addEventListener("click", function () {
          modalLi.classList.toggle("liSelected");
        });
      }
    }
  }

  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + id)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      let albums = result.data;
      console.log(albums);
      artistSection.classList.remove("d-none");
      for (let i = 0; i < 4; i++) {
        let singleEl = albums[i];
        let newDiv = document.createElement("div");
        newDiv.classList.add(
          "col",
          "col-6",
          "my-2",
          "d-flex",
          "align-items-start",
          "album-container",
          "flex-column"
        );
        albumList.classList.add("mb-5");
        let albumImg = document.createElement("img");
        albumList.appendChild(newDiv);
        newDiv.appendChild(albumImg);
        albumImg.src = singleEl.album.cover_medium;
        let trackTitleContainer = document.createElement("p");
        trackTitleContainer.classList.add("w-100", "mt-3", "pr-5");
        newDiv.appendChild(trackTitleContainer);
        trackTitleContainer.innerHTML = singleEl.title;
      }
      processedAlbum(albums);
    })
    .catch((error) => console.log(error));
};
getAlbum("eminem");
getAlbum("metallica");
getAlbum("queen");

const navUl = document.querySelector(".navbar-nav ul");
// console.log(navUl);
let newLi = document.createElement("li");
navUl.appendChild(newLi);
let newBtn = document.createElement("button");
newBtn.classList.add("btn", "btn-outline-success", "mt-5");
newBtn.setAttribute("data-toggle", "modal");
newBtn.setAttribute("data-target", "#modal");
newBtn.innerHTML = "Crea Lista";
newLi.appendChild(newBtn);
