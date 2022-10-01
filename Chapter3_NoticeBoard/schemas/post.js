const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    // postsId: {             // 고유번호
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },
    user: {                // 작성자명
        type: String,
        required: true,
        unique :true,
    },
    password: {             // 비밀번호
        type: String,
        required: true,
    },
    title: {                // 제목
        type: String,
        required: true,
    },
    content: {
        type: String,       // 내용
        required: true,

    },
    createdAt: {            // 시간
        type: Date,
        required: false,
    },
})

module.exports = mongoose.model("Posts", postSchema);