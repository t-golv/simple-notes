const addBtn = document.getElementById("add");
const container = document.querySelector(".container");
const notes = JSON.parse(localStorage.getItem("notes"));
const colors = ["blue", "green", "purple", "red"];

if (notes) {
  notes.forEach((note) => {
    if (note != "") {
      addNewNote(note);
    } else {
      updateLS();
    }
  });
}

addBtn.addEventListener("click", () => {
  addNewNote();
});
function randomColor() {
  const choice = Math.floor(Math.random() * colors.length);
  return colors[choice];
}
function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note", text == "" && "editing", randomColor());
  note.innerHTML = `
    <div class="tools">
    <button class="delete ${
      text ? "hidden" : ""
    }"><i class="fas fa-trash-alt"></i></button>
      <button class="edit" ><i class="fas fa-edit"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}">
    </div>
    <textarea class="${text ? "hidden" : ""}" >
    </textarea>
  `;
  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");
  textArea.value = text;
  main.innerHTML = marked(text);

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLS();
  });
  editBtn.addEventListener("click", (e) => {
    if (textArea.value == "") {
      note.remove();
    }
    if (!main.classList.contains("hidden")) {
      note.classList.add("editing");
      deleteBtn.classList.remove("hidden");
      main.classList.add("hidden");
      textArea.classList.remove("hidden");
      textArea.select();
    } else {
      note.classList.remove("editing");
      deleteBtn.classList.add("hidden");
      main.classList.remove("hidden");
      textArea.classList.add("hidden");
    }
  });
  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    updateLS();
  });

  container.appendChild(note);
  textArea.select();
  textArea.focus();
}
function updateLS() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
