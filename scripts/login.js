"use strict";

const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

// lấy dữ liệu user đã đang ký từ storage
const KEY = "USER_ARRAY";
let userArr = JSON.parse(getFromStorage(KEY));
console.log(userArr);

// tạo key cho bien checkLogin
const CHECKLOGIN = "checkLogin";

// tạo key cho array currentUser
const KEYLOGIN = "currentUser";
// tạo array currentUser
let currentUser = [];

// xoa su lieu tren form
function clearInput() {
  usernameInput.value = "";
  passwordInput.value = "";
}

// bắt sự kiện khi click vào button login
btnSubmit.addEventListener("click", function () {
  console.log("click register");

  let username = usernameInput.value;
  let password = passwordInput.value;

  let validate = false;

  // check dữ liệu nhập vào form có hợp lệ ko
  check: while (true) {
    // thong bao va yeu cau nguoi dung nhap username khi username bi bo trong
    if (!username) {
      alert("Please input for username");
      break check;
    }

    // thong bao va yeu cau nguoi dung nhap username khi username bi bo trong
    if (!password) {
      alert("Please input for password");
      break check;
    }

    validate = true;
    break; // thoat vong lap while
  }

  let index = -1;

  // check username và username có trong aray userArr hay ko
  if (validate) {
    for (let i = 0; i < userArr.length; i++) {
      if (
        userArr[i].username === username &&
        userArr[i].password === password
      ) {
        index = i;
      }
    }
    if (index !== -1) {
      currentUser.push(userArr[index]); // thêm p.tử tại vị trí index (p.tử vừa đăng nhập tài khoản thành công) vao array currentUser
      saveToStorage(KEYLOGIN, JSON.stringify(currentUser)); // lưu currentUser vào stroage
      saveToStorage(CHECKLOGIN, true);
      clearInput();
      window.location.href = "../index.html"; // chuyển sang trang login
    } else {
      alert("username or password is incorrect"); // thông báo khi username or password không chính xác
      clearInput();
    }
  }
});
