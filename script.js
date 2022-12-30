// using javascript modules for easier access of data as import with assert (json) isn't supported in firefox
import { details } from "./MOCK_DATA.js";
const tbody = document.querySelector("tbody");
let student = details;
student = student.map(transform);
// adding default 100 student data to table
student.forEach(addToTable);

const searchInput = document.querySelector("#search");
const form = document.querySelector("form");

// instruction wasn't clear as handleChange is React event thus used input event.
searchInput.addEventListener("input", filterBySearch);
form.addEventListener("submit", filterBySearch);

function filterBySearch(event) {
  event.preventDefault();
  let value = searchInput.value.trim().toLowerCase();
  if (value.length) {
    // something to filter
    let filtered = student.filter(
      (student) =>
        student.name.toLowerCase().includes(value) ||
        student.email.toLowerCase().includes(value)
    );
    if (filtered.length) {
      filtered.forEach(addToTable);
    } else {
      tbody.innerText = "";
    }
  } else {
    // render the complete list
    student.forEach(addToTable);
  }
}

const sortButtons = document.querySelectorAll(".sort-container > *");
for (let button of sortButtons) {
  button.addEventListener("click", sortData);
}
function sortData(event) {
  let previouslyClicked = document.querySelector(".active");
  if (previouslyClicked) {
    previouslyClicked.classList.toggle("active");
  }
  event.target.classList.toggle("active");
  let id = event.target.id;

  if (id == "ascending") {
    student.sort((a, b) => a.name.localeCompare(b.name));
    student.forEach(addToTable);
  } else if (id == "descending") {
    student.sort((a, b) => b.name.localeCompare(a.name));
    student.forEach(addToTable);
  } else if (id == "marks") {
    student.sort((a, b) => a.marks - b.marks);
    student.forEach(addToTable);
  } else if (id == "passing") {
    let passingStudent = student.filter(
      (student) => student.passing == "Passing"
    );
    passingStudent.forEach(addToTable);
  } else if (id == "classNo") {
    student.sort((a, b) => a.classNo - b.classNo);
    student.forEach(addToTable);
  } else if (id == "gender") {
    student.sort((a, b) => a.gender.localeCompare(b.gender));
    student.forEach(addToTable);
  }
}
function transform(student) {
  const {
    id,
    first_name,
    last_name,
    email,
    gender,
    marks,
    img_src,
    class: classNo,
    passing,
  } = student;

  return {
    id,
    imgSrc: img_src,
    name: first_name + " " + last_name,
    gender,
    classNo,
    marks,
    passing: passing ? "Passing" : "Failed",
    email,
  };
}
function addToTable(student, i) {
  // there are multiple insertions going to happen (leading to duplicates) thus, reset the table first.
  if (i == 0) {
    tbody.innerText = "";
  }
  const tr = document.createElement("tr");

  const details = Object.values(student);

  for (let i = 0; i < details.length; i++) {
    if (i == 2) continue;
    if (i == 1) {
      // inserting name
      const nameTd = document.createElement("td");
      nameTd.innerHTML = `<img src=${student.imgSrc} alt="photo"/> <span>${student.name}</span>`;
      tr.append(nameTd);
    } else {
      const newTd = document.createElement("td");
      newTd.textContent = details[i];
      tr.append(newTd);
    }
  }

  tbody.append(tr);
}