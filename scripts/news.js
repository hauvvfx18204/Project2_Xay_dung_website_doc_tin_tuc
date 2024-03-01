"use strict";

const articlesContainer = document.getElementById("news-container");
const btnPrevious = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const stt = document.getElementById("page-num");

const renderNews = function (data) {
  const html = `
    <div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${data.urlToImage}"
              class="card-img"
              alt="MIT researchers uncover ‘unpatchable’ flaw in Apple M1 chips - TechCrunch">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${data.title}</h5>
              <p class="card-text">${data.content}</p>
              <a href="${data.url}">View</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  //insertAdjacentHTML() là phương thức chèn các nút kết quả vào cây DOM tại một vị trí được chỉ định.
  articlesContainer.insertAdjacentHTML("beforeend", html); // beforeend là ngay bên trong phần tử, sau phần tử con cuối cùng của nó.
};

let totalResult;
let lengthPage;
let pageSize = 10;
let category = "business";
let maxPage;
let page = 1;

// check xem da co tai khoan nao đăng nhập vào chưa
// lấy trạng thái đăng nhập của người dùng
const CHECKLOGIN = "checkLogin";
let checkLogin = getFromStorage(CHECKLOGIN);
console.log(checkLogin);

if (checkLogin) {
  const KEYLOGIN = "currentUser";
  // lấy dư liệu người dùng đăng nhập hiện tại từ storage
  let currentUser = JSON.parse(getFromStorage(KEYLOGIN));
  console.log(currentUser);
  pageSize = currentUser[0].sizePage;
  category = currentUser[0].category;
}

console.log(pageSize);
console.log(category);

const newapi = async function (category, page, pageSize) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=2ac485413a1d46e89d43cd70f86abea3`
    );
    const data = await response.json();
    console.log(data);
    for (let i = 0; i < data.articles.length; i++) {
      renderNews(data.articles[i]);
    }
    totalResult = Number(data.totalResults);

    lengthPage = data.articles.length;

    maxPage = Math.ceil(totalResult / lengthPage); // tính số page để lưu hết số kết quả trả về

    return maxPage;
  } catch (err) {
    console.error(err);
  }
};

let temp;

newapi(category, page, pageSize).then((maxPage) => {
  temp = maxPage;
});
btnPrevious.style.display = "none"; // ẩn button previous
btnNext.style.display = "block"; // hien thi button next

console.log(temp);

// bat sự kiện click vào button next
btnNext.addEventListener("click", function () {
  page = page + 1;
  btnPrevious.style.display = "block"; // an btnPreviouss

  if (page < temp) {
    stt.textContent = page; // thiet lap gia tri cho stt
    articlesContainer.innerHTML = ""; // xóa p.tử html da ton tai truoc do
    newapi(category, page, pageSize); // chen data vao code html
  } else {
    stt.textContent = page; // thiet lap gia tri cho stt
    articlesContainer.innerHTML = ""; // xóa p.tử html da ton tai truoc do
    newapi(category, page, pageSize); // chen data vao code html

    btnNext.style.display = "none";
  }
});

// bắt sự kiện click vào button previous
btnPrevious.addEventListener("click", function () {
  page = page - 1;
  btnNext.style.display = "block"; // hiển thị button next

  if (page === 1) {
    btnPrevious.style.display = "none"; // ẩn button previous
    stt.textContent = page; // thiet lap gia tri cho stt
    articlesContainer.innerHTML = ""; // xóa p.tử html da ton tai truoc do
    newapi(category, page, pageSize); // chen data vao code html
  } else {
    stt.textContent = page; // thiet lap gia tri cho stt
    articlesContainer.innerHTML = ""; // xóa p.tử html da ton tai truoc do
    newapi(category, page, pageSize); // chen data vao code html
  }
});
