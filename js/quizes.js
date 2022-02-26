const quizesContainer = document.querySelector("[data-quizes-container]");
const template = document.querySelector("[data-template]");
const searchInput = document.querySelector("[data-search]");

const getData = async () => {
  const response = await fetch("../js/quizes.json");
  const quizes = await response.json();
  return quizes.quizes;
};

getData().then((quizes) => {
  quizes.forEach((quiz) => {
    renderQuiz(quiz);
  });
});

searchInput.addEventListener("input", (e) => {
  let value = e.target.value;
  value = value.charAt(0).toUpperCase() + value.slice(1);
  quizesContainer.replaceChildren();
  if (value) return searchQuizes(value);
  getData().then((quizes) => {
    quizes.forEach((quiz) => {
      renderQuiz(quiz);
    });
  });
});

// render quizes from json document

function renderQuiz(quiz) {
  const clone = template.content.cloneNode(true);
  let quizArticle = clone.firstElementChild;

  appendTextContents(quizArticle, quiz);

  quizesContainer.appendChild(clone);
}

function appendTextContents(quizArticle, quiz) {
  let quizName = quizArticle.children[0];
  let quizCategory = quizArticle.children[1];
  let quizDescription = quizArticle.children[2];

  quizName.textContent = quiz.name;
  quizCategory.textContent = quiz.category;
  quizDescription.textContent = quiz.description;
}

// search functionality for quizes

function searchQuizes(searchValue) {
  quizesContainer.replaceChildren();
  getData().then((quizes) => {
    quizes.forEach((quiz) => {
      if (quiz.name.includes(searchValue)) return renderQuiz(quiz);

      if (quiz.category.includes(searchValue)) return renderQuiz(quiz);
    });
  });
}
