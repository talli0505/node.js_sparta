// mongoose 라이브러리 가져오기
const mongoose = require("mongoose");

// 설치한 몽고디비에 접근, 에러가 있으면 에러 말하기
const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/spa_board")
    .catch(err => console.log(err));
};

// 몽구스의 연결이 실패할 경우 에러 말해주는거
mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

// 현재 모듈을 내보내 줌
module.exports = connect;