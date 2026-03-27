#!/bin/bash

echo "================= SETUP ================="

echo "Installing npm packages..."
npm install

echo "Resetting data files..."
echo '{ "username": "admin", "password": "admin123" }' > ./data/admin.json
echo '[]' > ./data/student.json
echo '[]' > ./data/book.json

echo "================= ADMIN AUTH TEST ================="
node app.js addStudent --password=wrong --studentName=Test --studentPassword=1234

echo "================= ADMIN PASSWORD VALIDATION ================="
node app.js changePasswordAdmin --oldPassword=admin123 --newPassword=Abc1234
node app.js changePasswordAdmin --oldPassword=admin123 --newPassword=Abcdefghijklmn12345678
node app.js changePasswordAdmin --oldPassword=admin123 --newPassword=abcd1234
node app.js changePasswordAdmin --oldPassword=admin123 --newPassword=ABCD1234
node app.js changePasswordAdmin --oldPassword=admin123 --newPassword=abcdEFGG

echo "---- Valid Password Change ----"
node app.js changePasswordAdmin --oldPassword=admin123 --newPassword=Abcd1234

echo "================= ADD STUDENTS ================="
node app.js addStudent --password=Abcd1234 --studentName=Jay --studentPassword=1234
node app.js addStudent --password=Abcd1234 --studentName=Raj --studentPassword=1234
node app.js addStudent --password=Abcd1234 --studentName=Om --studentPassword=1234

echo "---- Duplicate Student ----"
node app.js addStudent --password=Abcd1234 --studentName=Jay --studentPassword=1234

echo "---- Invalid Inputs ----"
node app.js addStudent --password=Abcd1234 --studentName="" --studentPassword=1234
node app.js addStudent --password=Abcd1234 --studentName=Test --studentPassword=""

echo "================= ADD BOOKS ================="
node app.js addBook --password=Abcd1234 --bookName="" --bookCount=5
node app.js addBook --password=Abcd1234 --bookName=English --bookCount=0

node app.js addBook --password=Abcd1234 --bookName=English --bookCount=10
node app.js addBook --password=Abcd1234 --bookName=English --authorName=Smith --bookCount=10

node app.js addBook --password=Abcd1234 --bookName=Maths --authorName=Shrinivas --bookCount=20
node app.js addBook --password=Abcd1234 --bookName=Maths --authorName=Ramanujan --bookCount=20

node app.js addBook --password=Abcd1234 --bookName=Geography --authorName=Haresh --bookCount=1

echo "================= STUDENT FLOW ================="

echo "---- Jay changes password ----"
node app.js changePasswordStudent --username=Jay --oldPassword=1234 --newPassword=Jay1234

node app.js changePasswordStudent --username=Jay --oldPassword=1234 --newPassword=Jay12345

echo "---- Issue unavailable book ----"
node app.js issueOrReturnBook --username=Jay --password=Jay12345 --bookName=Science --issueOrReturn=issue

echo "---- List Books ----"
node app.js listBooksStudent --username=Jay --password=Jay12345

echo "---- Jay issues Geography ----"
node app.js issueOrReturnBook --username=Jay --password=Jay12345 --bookName=Geography --issueOrReturn=issue

echo "---- Raj tries same book ----"
node app.js issueOrReturnBook --username=Raj --password=1234 --bookName=Geography --issueOrReturn=issue

echo "---- Jay returns Geography ----"
node app.js issueOrReturnBook --username=Jay --password=Jay12345 --bookName=Geography --issueOrReturn=return

echo "---- Raj issues Geography ----"
node app.js issueOrReturnBook --username=Raj --password=1234 --bookName=Geography --issueOrReturn=issue

echo "---- Raj issues English & Maths ----"
node app.js issueOrReturnBook --username=Raj --password=1234 --bookName=English --issueOrReturn=issue
node app.js issueOrReturnBook --username=Raj --password=1234 --bookName=Maths --issueOrReturn=issue

echo "---- Raj checks issued books ----"
node app.js checkIssuedBooks --username=Raj --password=1234

echo "================= ADMIN CLEANUP ================="

echo "---- Try deleting Raj ----"
node app.js removeStudent --password=Abcd1234 --studentName=Raj

echo "---- Remove Om ----"
node app.js removeStudent --password=Abcd1234 --studentName=Om

echo "---- Try removing Geography ----"
node app.js removeBook --password=Abcd1234 --bookName=Geography

echo "---- Raj returns Geography ----"
node app.js issueOrReturnBook --username=Raj --password=1234 --bookName=Geography --issueOrReturn=return

echo "---- Remove Geography ----"
node app.js removeBook --password=Abcd1234 --bookName=Geography

echo "================= TEST COMPLETED ================="
