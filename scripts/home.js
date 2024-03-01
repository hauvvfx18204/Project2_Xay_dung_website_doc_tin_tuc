"use strict";

const displayLoginModal = document.getElementById("login-modal");
const displayMainContent = document.getElementById("main-content");
const tagMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

// lấy trạng thái đăng nhập của người dùng
const CHECKLOGIN = "checkLogin";
let checkLogin = getFromStorage(CHECKLOGIN);
console.log(checkLogin);

const KEYLOGIN = "currentUser";
// lấy dư liệu người dùng đăng nhập hiện tại từ storage
let currentUser = JSON.parse(getFromStorage(KEYLOGIN));

// sử lý logic biến checkLogin
if (checkLogin) {
  displayLoginModal.style.display = "none"; // ẩn div có id login-modal
  tagMessage.textContent = `Welcome ${currentUser[0].firstName}`;
  displayMainContent.style.display = "block"; // hiển thị div có id main-content
} else {
  displayLoginModal.style.display = "block"; // hiển thị div có id login-modal
  displayMainContent.style.display = "none"; // ẩn div có id main-content
}

// bắt sự kiện click button btnLogout
btnLogout.addEventListener("click", function () {
  localStorage.removeItem(KEYLOGIN); // xóa User hiện tại ở LocalStorage
  localStorage.removeItem(CHECKLOGIN); // xóa trạng thái đăng nhập User hiện tại ở LocalStorage
  window.location.href = "../pages/login.html"; // chuyển sang trang login
});
