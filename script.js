const button = document.querySelector(".add-btn");
const input = document.querySelector(".input");
const completeList = document.querySelector(".complete-list");

let listOfItems = [];
function addTask() {
  if (input.value === "") {
    Toastify({
      text: "Ops, escreva uma tarefa!",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#ff4444",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    return;
  }

  listOfItems.push({
    task: input.value,
    done: false,
  });

  input.value = "";
  showTasks();
}

function showTasks() {
  let newLi = "";

  listOfItems.forEach((item, index) => {
    newLi =
      newLi +
      `
      <li class="${item.done && "done"}">
          <img class="img-checked" onclick="taskDone(${index})" src="/assets/checked.png" alt="" />
          <p>${item.task}</p>
          <img class="img-trash" onclick="removeItem(${index})" src="/assets/trash.png" alt="" />
        </li>
    
    `;
  });
  completeList.innerHTML = newLi;

  localStorage.setItem("list", JSON.stringify(listOfItems));
}

function taskDone(index) {
  listOfItems[index].done = !listOfItems[index].done;
  showTasks();
}

function removeItem(index) {
  listOfItems.splice(index, 1);
  showTasks();
}

function memoryItems() {
  const previousTasks = localStorage.getItem("list");
  if (previousTasks) {
    listOfItems = JSON.parse(previousTasks);
  }
  showTasks();
}

memoryItems();
button.addEventListener("click", addTask);
