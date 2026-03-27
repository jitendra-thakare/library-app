# Library Management CLI App
## Project Description

This is a command line based Library Management System built using Node.js.
It allows an admin to manage students and books, and students to issue and return books.

## Commands

### Admin Commands

node app.js addStudent --password=<adminPassword> --studentName=<name> --studentPassword=<password>
node app.js removeStudent --password=<adminPassword> --studentName=<name>
node app.js addBook --password=<adminPassword> --bookName=<name> --authorName=<author> --bookCount=<count>
node app.js removeBook --password=<adminPassword> --bookName=<name>
node app.js listBooksAdmin --password=<adminPassword>
node app.js listBooksIssued --password=<adminPassword> --bookName=<name>
node app.js changePasswordAdmin --oldPassword=<old> --newPassword=<new>

---

### Student Commands

node app.js changePasswordStudent --username=<name> --oldPassword=<old> --newPassword=<new>
node app.js listBooksStudent --username=<name> --password=<password>
node app.js issueOrReturnBook --username=<name> --password=<password> --bookName=<name> --issueOrReturn=issue
node app.js issueOrReturnBook --username=<name> --password=<password> --bookName=<name> --issueOrReturn=return
node app.js checkIssuedBooks --username=<name> --password=<password>

---


## Features

* Admin authentication system
* Add and remove students
* Add and remove books
* Track issued books
* Student login system
* Issue and return books
* Input validation and error handling

---

## Tech Stack

* Node.js
* yargs (for CLI commands)
* chalk (for terminal styling)
* JSON files for data storage

---

## Project Structure

commands/ → CLI command definitions
modules/ → Business logic (admin, student, book)
utils/ → Utility functions (JSON handler, validation)
data/ → JSON files for storing data
app.js → Entry point

---

## Installation

npm install

---

## Run Application

node app.js <command>

---

## Run Full Test

bash test.sh

---

## Notes

* Admin credentials are stored in data/admin.json
* Students are stored in data/student.json
* Books are stored in data/book.json
* Ensure correct passwords are used for authentication
* Book and student data are kept in sync during issue/return operations

---

