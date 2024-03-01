"use strict";

const btnAdd = document.getElementById("btn-add");
const inputTask = document.getElementById("input-task");

const todoList = document.getElementById("todo-list");

// lấy trạng thái đăng nhập của người dùng
const CHECKLOGIN = "checkLogin";
let checkLogin = getFromStorage(CHECKLOGIN);

if (checkLogin) {
  // hàm thêm các p.tử html
  const renderTodo = function (data) {
    const html = `
    <li class="${data.isDone ? "checked" : ""}">${
      data.task
    }<span class="close">×</span></li>
    `;

    //insertAdjacentHTML() là phương thức chèn các nút kết quả vào cây DOM tại một vị trí được chỉ định.
    todoList.insertAdjacentHTML("beforeend", html); // beforeend là ngay bên trong phần tử, sau phần tử con cuối cùng của nó.
  };

  // lấy dư liệu người dùng đăng nhập hiện tại từ storage
  const KEYLOGIN = "currentUser";
  let currentUser = JSON.parse(getFromStorage(KEYLOGIN));

  let KEYTODOARR;

  // gan gia tri KEYTODOARR bang username cua tai khoan đang đăng nhập -> khi lưu vào storage ta sẽ có các key riêng biệt vì các username ko được trùng nhau
  if (currentUser) {
    KEYTODOARR = currentUser[0].username;
  }

  // lấy array todoArr từ storage
  let todoArr = JSON.parse(getFromStorage(KEYTODOARR));
  console.log(todoArr);
  if (!todoArr) {
    todoArr = []; // nếu todoArr rỗng thì tạo mảng todoArr
  } else {
    for (let i = 0; i < todoArr.length; i++) {
      renderTodo(todoArr[i]); // todoArr khác rỗng thì hiện thị toàn bộ mảng todoArr
    }
    // sau khi toàn bộ các p.tử html được diện thị thì ta gọi hàm bắt sự kiện khi click vào các p.tử
    eventToggleTask();
    eventDeleteTasks();
  }

  // bắt sự kiện khi click vào button add
  btnAdd.addEventListener("click", function () {
    let task = inputTask.value.trim();

    let validate = false;

    // check dữ liệu nhập vào từ form
    check: while (true) {
      if (!task) {
        alert("Please input for ");
        break check;
      }

      validate = true;
      break; // thoat vong lap while
    }

    if (validate) {
      let data = new Task(task, currentUser[0].username, false);
      todoArr.push(data); // them data vào cuối mảng todoArr
      inputTask.value = ""; // reset form nhạp dữ liệu
      saveToStorage(KEYTODOARR, JSON.stringify(todoArr)); // lưu todoArr vào storage
      todoArr = JSON.parse(getFromStorage(KEYTODOARR)); // lấy dữ liệu mảng todoArr vừa được cập nhật từ storage

      todoList.innerHTML = ""; // xóa toàn bộ các p.tử html đã thêm vào trước đó
      for (let i = 0; i < todoArr.length; i++) {
        renderTodo(todoArr[i]); // hiển thị lại các p.tử html có trong mảng todoArr
      }

      // gọi 2 hàm bắt sự kiện khi click vào các p.tử html
      eventToggleTask(); // hàm thay đổi isDone
      eventDeleteTasks(); // hàm xóa p.tử html
    }
  });

  // bắt sự kiện khi click vào các p.tử html
  function eventToggleTask() {
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (e) {
        if (e.target !== liEl.children[0]) {
          liEl.classList.toggle("checked");

          // tìm p.tử vừa dc click
          const todo = todoArr.find(
            (todoItem) => todoItem.task === liEl.textContent.slice(0, -1)
          );

          // thay đổi isDone cho p.tử vừa được lick
          todo.isDone = liEl.classList.contains("checked") ? true : false;

          // lưu lại trên storeage
          saveToStorage(KEYTODOARR, JSON.stringify(todoArr));
        }
      });
    });
  }

  // bắt sự kiện khi click xóa 1 p.tử html
  function eventDeleteTasks() {
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function () {
        const isDelete = confirm("delete element");

        if (isDelete) {
          const index = todoArr.findIndex(
            (item) =>
              item.task === closeEl.parentElement.textContent.slice(0, -1)
          );
          todoArr.splice(index, 1);
        }

        saveToStorage(KEYTODOARR, JSON.stringify(todoArr));

        todoArr = JSON.parse(getFromStorage(KEYTODOARR));

        todoList.innerHTML = ""; // xóa toàn bộ các p.tử html đã thêm vào trước đó
        for (let i = 0; i < todoArr.length; i++) {
          renderTodo(todoArr[i]); // hiển thị lại các p.tử html có trong mảng todoArr
        }

        // gọi 2 hàm bắt sự kiện khi click vào các p.tử html
        eventToggleTask(); // hàm thay đổi isDone
        eventDeleteTasks(); // hàm xóa p.tử html
      });
    });
  }
} else {
  alert("Pleased login");
  window.location.href = "../pages/login.html"; // chuyển sang trang login
}
