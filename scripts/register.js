"use strict";

const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const confirmPasswordInput = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

// khi input thanh cong thi xoa cac du lieu tren form
function clearInput() {
  firstNameInput.value = "";
  lastNameInput.value = "";
  usernameInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
}

// lấy dữ liệu từ storage
const KEY = "USER_ARRAY";
let userArr = JSON.parse(getFromStorage(KEY)) || []; // lấy array những người đã đăng ký từ storage, neu chua co nguoi nao dang ky thi cho khoi tao array

// bat su kien khi click vao button register
btnSubmit.addEventListener("click", function () {
  console.log("click register");

  let firstName = firstNameInput.value;
  let lastName = lastNameInput.value;
  let username = usernameInput.value;
  let password = passwordInput.value;
  let confirmPassword = confirmPasswordInput.value;

  let validate = false;

  // xac thuc du lieu hop le theo yeu cau
  check: while (true) {
    // thong bao va yeu cau nguoi dung nhap firstName khi firstName bi bo trong
    if (!firstName) {
      alert("Please input for firstName");
      break check;
    }

    // thong bao va yeu cau nguoi dung nhap lastName khi lastName bi bo trong
    if (!lastName) {
      alert("Please input for lastName");
      break check;
    }

    // thong bao va yeu cau nguoi dung nhap username khi username bi bo trong
    if (!username) {
      alert("Please input for username");
      break check;
    }

    // check username co bi trung voi username da nhap truoc do hay ko, trung yeu cau nhap lai username
    if (userArr.length > 0) {
      for (let i = 0; i < userArr.length; i++) {
        if (userArr[i].username === username) {
          alert("ID must unique!");
          usernameInput.value = "";
          break check;
        }
      }
    }

    // thong bao va yeu cau nguoi dung nhap username khi username bi bo trong
    if (password.length <= 8) {
      alert("Please input for username must be more than 8 characters");
      break check;
    }

    // thong bao va yeu cau nguoi dung nhap password và confirmPassword phải giống nhau.
    if (password !== confirmPassword) {
      alert("Please input the same password and confirm password");
      break check;
    }

    validate = true;
    break; // thoat vong lap while
  }

  if (validate) {
    let data = new User(firstName, lastName, username, password);
    userArr.push(data); // them data vao array userArr

    saveToStorage(KEY, JSON.stringify(userArr)); // luu dua lieu vao stroage
    clearInput();

    window.location.href = "../pages/login.html"; // chuyển sang trang login
  }
});
