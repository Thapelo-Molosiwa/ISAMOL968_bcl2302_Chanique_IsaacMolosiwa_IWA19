// import data
import { books, authors, genres, BOOKS_PER_PAGE} from "./data.js";


// global variables
let page = 1;
let range = books.length;

// color settings for day and night mode

/*
These two objects define color values for a light and dark theme. The day object
has a dark color value of "10, 10, 20" and a light color value of "255, 255,
255". The night object has a dark color value of "255, 255, 255" and a light
color value of "10, 10, 20".
*/
const day = {
  dark: "10, 10, 20",
  light: "255, 255, 255",
};

const night = {
  dark: "255, 255, 255",
  light: "10, 10, 20",
};

// color settings for day and night mode
const fragment = document.createDocumentFragment();

// index variables to determine which books to extract for the previews
let startIndex = 0;
let endIndex = 36;

// extract book previews from the books array

/**This line of code creates a new array called extracted by slicing the books
array from the startIndex index up to, but not including, the endIndex index.
*/
const extracted = books.slice(startIndex, endIndex);

// create preview elements for each book and add them to the document fragment
for (let i = 0; i < extracted.length; i++) {

  const preview = document.createElement("dl");

  preview.className = "preview";
  preview.dataset.id = books[i].id;
  preview.dataset.title = books[i].title;
  preview.dataset.image = books[i].image;
  preview.dataset.subtitle = `${authors[books[i].author]} (${new Date(
    books[i].published
  ).getFullYear()})`;
  preview.dataset.description = books[i].description;
  preview.dataset.genre = books[i].genres;
  preview.innerHTML = /*html*/ `
      <div>
      <image class='preview__image' src="${books[i].image}" alt="book pic"}/>
      </div>
      <div class='preview__info'>
      <dt class='preview__title'>${books[i].title}<dt>
      <dt class='preview__author'> By ${authors[books[i].author]}</dt>
      </div>`;

  fragment.appendChild(preview);
}

// add the preview elements to the book list

const booklist1 = document.querySelector("[data-list-items]");

booklist1.appendChild(fragment);

// event listener to show the search overlay
const searchbutton = document.querySelector("[data-header-search]");

searchbutton.addEventListener("click", (event) => {
  document.querySelector("[data-search-overlay]").style.display = "block";
});

// event listener to hide the search overlay
const searchCancel = document.querySelector("[data-search-cancel]");

searchCancel.addEventListener("click", (event) => {
  document.querySelector("[data-search-overlay]").style.display = "none";
});

// event listener to show the settings overlay
//Settings
const settingbutton = document.querySelector("[data-header-settings]");

settingbutton.addEventListener("click", (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "block";
});

// event listener to hide the settings overlay
const settingCancel = document.querySelector("[data-settings-cancel]");

settingCancel.addEventListener("click", (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "none";
});

// function to display book details ......code to display book details
const detailsToggle = (event) => {

  const overlay1 = document.querySelector("[data-list-active]");

  const title = document.querySelector("[data-list-title]");

  const subtitle = document.querySelector("[data-list-subtitle]");

  const description = document.querySelector("[data-list-description]");

  const image1 = document.querySelector("[data-list-image]");

  const imageblur = document.querySelector("[data-list-blur]");

  event.target.dataset.id ? (overlay1.style.display = "block") : undefined;

  event.target.dataset.description
    ? (description.innerHTML = event.target.dataset.description)
    : undefined;
  event.target.dataset.subtitle
    ? (subtitle.innerHTML = event.target.dataset.subtitle)
    : undefined;
  event.target.dataset.title
    ? (title.innerHTML = event.target.dataset.title)
    : undefined;
  event.target.dataset.image
    ? image1.setAttribute("src", event.target.dataset.image)
    : undefined;
  event.target.dataset.image
    ? imageblur.setAttribute("src", event.target.dataset.image)
    : undefined;
};

// selecting and adding click event to close button
const detailsClose = document.querySelector("[data-list-close]");

detailsClose.addEventListener("click", (event) => {
  document.querySelector("[data-list-active]").style.display = "none";
});

// selecting and adding click event to book item
const bookclick = document.querySelector("[data-list-items]");
bookclick.addEventListener("click", detailsToggle);




// creating options for author select dropdown
const authorSelect = document.querySelector("[data-search-authors]");
const allAuthorOption = document.createElement('option');
allAuthorOption.value = "authors";
allAuthorOption.textContent = "All Authors";
authorSelect.appendChild(allAuthorOption);

for (const authorId in authors) {
  const optionElement = document.createElement("option");
  optionElement.value = authorId;
  optionElement.textContent = authors[authorId];
  authorSelect.appendChild(optionElement);
}

// creating options for genre select dropdown
const genreSelect = document.querySelector("[data-search-genres]");
const allGenreOption = document.createElement('option');
allGenreOption.value = "all";
allGenreOption.textContent = "All Genres";
genreSelect.appendChild(allGenreOption);

for (const genreId in genres) {
  const optionElement = document.createElement("option");
  optionElement.value = genreId;
  optionElement.textContent = genres[genreId];
  genreSelect.appendChild(optionElement);
}

//change themes
const dataSettingsTheme = document.querySelector("[data-settings-theme]");
const saveButton = document.querySelector(
  "body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary"
);

saveButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (dataSettingsTheme.value === "day") {
    document.querySelector("body").style.setProperty("--color-dark", day.dark);
    document
      .querySelector("body")
      .style.setProperty("--color-light", day.light);
    appoverlays.settingsOverlay.close();
  }

  document.querySelector("[data-settings-overlay]").style.display = "none";
  if (dataSettingsTheme.value === "night") {
    document
      .querySelector("body")
      .style.setProperty("--color-dark", night.dark);
    document
      .querySelector("body")
      .style.setProperty("--color-light", night.light);
    appoverlays.settingsOverlay.close();
  }
});

// Show more button

const showMoreButton = document.querySelector("[data-list-button]");

const numItemsToShow = books.length - endIndex;

showMoreButton.innerHTML = `show more(${books.length - range})`;

showMoreButton.addEventListener("click", () => {
  // create a document fragment to store elements before adding to the DOM
  const fragment = document.createDocumentFragment();

  // update start and end indexes
  startIndex += 36;
  endIndex += 36;

  const startIndex1 = startIndex;
  const endIndex1 = endIndex;

  // extract books within new range
  const extracted = books.slice(startIndex1, endIndex1);

  // create a preview element for each book and append to fragment
  for (const {
    author,
    image,
    title,
    id,
    description,
    published,
  } of extracted) {
    const preview = document.createElement("dl");
    preview.className = "preview";
    preview.dataset.id = id;
    preview.dataset.title = title;
    preview.dataset.image = image;
    preview.dataset.subtitle = `${authors[author]} (${new Date(
      published
    ).getFullYear()})`;
    preview.dataset.description = description;
    preview.dataset.genre = genres;
    preview.innerHTML = /*html*/ `
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`;
    fragment.appendChild(preview);
  }

  // append fragment to book list
  const booklist1 = document.querySelector("[data-list-items]");
  booklist1.appendChild(fragment);
});
