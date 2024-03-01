"use strict";

const newSizePage = document.getElementById("input-page-size");
const newCategory = document.getElementById("input-category");
const btnSetting = document.getElementById("btn-submit");

// lấy dư liệu người dùng đăng nhập hiện tại từ storage
const KEYLOGIN = "currentUser";
let currentUser = JSON.parse(getFromStorage(KEYLOGIN));
console.log(currentUser);

// lấy dữ liệu từ storage
const KEY = "USER_ARRAY";
let userArr = JSON.parse(getFromStorage(KEY)); // lấy array những người đã đăng ký từ storage

// clear du lieu da nhap tren form
function clear() {
  newSizePage.value = "";
  newCategory.value = "";
}

// bắt sự kiện khi click vào button save setting
btnSetting.addEventListener("click", function () {
  let sizePage = Number(newSizePage.value);
  let category = newCategory.value;

  let validate = false;

  // check dữ liệu nhập vào form có hợp lệ ko
  check: while (true) {
    // thong bao va yeu cau nguoi dung nhap username khi username bi bo trong
    if (!sizePage) {
      alert("Please input for sizePage");
      break check;
    }

    // thong bao va yeu cau nguoi dung nhap username khi username bi bo trong
    if (category === "General") {
      alert("Please input for category");
      break check;
    }

    validate = true;
    break; // thoat vong lap while
  }

  if (validate) {
    // dat lai gia tri cho 2 thuoc tinh sizePage va category
    currentUser[0].sizePage = sizePage;
    currentUser[0].category = category;

    // luu lai currentUser vao storage
    saveToStorage(KEYLOGIN, JSON.stringify(currentUser));
    // currentUser = JSON.parse(getFromStorage(KEYLOGIN));
    // console.log(currentUser);

    // tim doi tuong dang nhap hien tai duoc luu tren userArr va dat lai gia tri cho 2 thuoc tinh, vi khi logout thi currentUSer se bi xoa vi vay luc dang nhap lai thi currentUser se lay gia tri trong userArr -> can phai sua ca tren userArr
    for (let i = 0; i < userArr.length; i++) {
      if (currentUser[0].username === userArr[i].username) {
        userArr[i].sizePage = sizePage;
        userArr[i].category = category;
        saveToStorage(KEY, JSON.stringify(userArr));
      }
    }
    clear();
  }
});
