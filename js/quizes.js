const quizesContainer = document.querySelector("[data-quizes-container]");
const template = document.querySelector("[data-template]");
const searchInput = document.querySelector("[data-search]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const sortByBtn = document.querySelector("[data-sort-by]");
const slideBlueDiv = document.querySelector("[data-slide-blue]");
const slideTextDiv = document.querySelector("[data-slide-text]");
const optionsContainer = document.querySelector("[data-options]");
const options = document.querySelectorAll("[data-option]");
let areOptionsOpened = false;

let quizesArray = [];
let modifiedQuizes = [];

const getData = async () => {
  const response = await fetch("../js/quizes.json");
  const quizes = await response.json();
  quizesArray = quizes;
  return renderQuizes(quizes);
};

// EVENT LISTENERS

document.addEventListener("DOMContentLoaded", async () => {
  await getData();
});

searchInput.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();

  mobileNav.classList.add("hide-mobile-nav");

  searchQuizes(value);
});

sortByBtn.addEventListener("click", () => {
  appendOptions();
  areOptionsOpened = true;
});

document.body.addEventListener("click", (e) => {
  if (e.target.matches(".sort-by")) return;
  if (e.target.parentElement.id === "options") {
    checkOption(e.target);
    removeOptions();

    areOptionsOpened = false;
    return;
  }

  removeOptions();
  areOptionsOpened = false;
});

// render quizes from json document

function renderQuizes(quizes) {
  modifiedQuizes = quizes.map((quiz) => {
    const quizArticle = template.content.cloneNode(true).children[0];
    const name = quizArticle.querySelector("[data-name]");
    const category = quizArticle.querySelector("[data-category]");
    const description = quizArticle.querySelector("[data-desc]");
    name.textContent = quiz.name;
    category.textContent = quiz.category;
    description.textContent = quiz.description;
    quizesContainer.append(quizArticle);
    return {
      name: quiz.name,
      category: quiz.category,
      description: quiz.description,
      element: quizArticle,
    };
  });
}

// search functionality for quizes

function searchQuizes(searchValue) {
  modifiedQuizes.forEach((quiz) => {
    let isQuizFounded =
      quiz.name.includes(searchValue) || quiz.category.includes(searchValue);
    quiz.element.classList.toggle("hide-quiz", !isQuizFounded);
    mobileNav.classList.remove("hide-mobile-nav");
  });
}

function removeQuizes() {
  while (quizesContainer.firstChild) {
    quizesContainer.removeChild(quizesContainer.firstChild);
  }
}

// sort by

function checkOption(target) {
  if (target.classList.contains("bold-option")) {
    target.classList.remove("bold-option");
    removeQuizes();
    return renderQuizes(quizesArray);
  }
  options.forEach((option) => {
    option.classList.remove("bold-option");
  });

  if (target.matches(".ascending")) return handleAscending(target);
  if (target.matches(".descending")) return handleDescending(target);
}

function appendOptions() {
  slideBlueDiv.classList.add("transform-options-blue");
  slideTextDiv.classList.add("transform-options-text");
  optionsContainer.classList.add("transform-options");
}
function removeOptions() {
  slideBlueDiv.classList.remove("transform-options-blue");
  slideTextDiv.classList.remove("transform-options-text");
  optionsContainer.classList.remove("transform-options");
}

function handleAscending(target) {
  target.classList.add("bold-option");
  removeQuizes();
  modifiedQuizes.sort(GetAscSortOrder("name"));
  renderQuizes(modifiedQuizes);
}

function handleDescending(target) {
  target.classList.add("bold-option");
  removeQuizes();
  modifiedQuizes.sort(GetDescSortOrder("name"));
  renderQuizes(modifiedQuizes);
}

function GetAscSortOrder(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
}
function GetDescSortOrder(prop) {
  return function (a, b) {
    if (a[prop] < b[prop]) {
      return 1;
    } else if (a[prop] > b[prop]) {
      return -1;
    }
    return 0;
  };
}
