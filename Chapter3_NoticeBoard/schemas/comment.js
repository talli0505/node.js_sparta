const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    postId: {            //고유번호
        type: String, 
    },
    user: {               //작성자명
        type: String,
        required: true,
    },
    password: {           // 비밀번호
        type: String,
        required: true,
    },
    content: {            // 댓글
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Comment", commentSchema);