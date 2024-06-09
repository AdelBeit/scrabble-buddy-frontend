document.addEventListener("DOMContentLoaded", __main__);

var mode = "validate"; // search | validate
var cards = [];

function __main__() {
  updateMode("validate");
  ET("viewed");

  const searchButton = document.querySelector("button.search");
  searchButton.addEventListener("click", () => {
    updateMode("search");
  });

  const validateButton = document.querySelector("button.validate");
  validateButton.addEventListener("click", () => {
    updateMode("validate");
  });
  
  const submitButton = document.querySelector("button.submit");
  submitButton.addEventListener("click", () => {
    submit();
  });
}

fileLoadedCheck();
