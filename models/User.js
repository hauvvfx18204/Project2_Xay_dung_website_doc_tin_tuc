"use strict";

class User {
  constructor(
    firstName,
    lastName,
    username,
    password,
    sizePage = 10,
    category = "business"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.sizePage = sizePage;
    this.category = category;
  }
}

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
