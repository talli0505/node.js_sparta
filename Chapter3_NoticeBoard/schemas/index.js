// mongoose 라이브러리 가져오기
const mongoose = require("mongoose");

// 설치한 몽고디비에 접근, 에러가 있으면 에러 말하기
const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/aaa")
    .catch(err => console.log(err));
};


mongoose.connection.on("error", err => {
console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
