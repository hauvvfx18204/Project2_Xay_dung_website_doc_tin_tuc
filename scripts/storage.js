"use strict";

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key) {
  return localStorage.getItem(key);
}

// saveToStorage(KEY, JSON.stringify(userArr));     luu vao store
// let userArr = JSON.parse(getFromStorage(KEY));   lay du lieu tu store
