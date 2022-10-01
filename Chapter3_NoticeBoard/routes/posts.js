// 게시글 작성 : /posts POST
// 게시글 조회 : /posts GET
// 게시글 상세 조회 : /posts/:_postId GET
// 게시글 수정 : /posts/:_postId PUT
// 게시글 삭제 : /posts/:_postId DELETE

const express = require("express");
const Posts = require("../schemas/post.js");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("this is root page!");
});


// 게시글 조회 : /posts GET
router.get("/posts", async (req, res) => {

    const dataAll = await Posts.find().sort(({ createdAt: -1 }))


    const data = []
    for (let i = 0; i < dataAll.length; i++) {
        data.push({
            postId: dataAll[i]._id.toString(),
            user: dataAll[i].user,
            title: dataAll[i].title,
            createdAt: dataAll[i].createdAt,
        });
    }

    res.json({ data : data });
});


// 게시글 상세 조회 : /posts/:_postId GET
router.get("/posts/:_postsId", async (req, res) => {

    const { _postsId } = req.params;


    const currentPost = await Posts.find({ _id: (_postsId) });


    if (!currentPost.length) {
      return res.status(400).json({ success: false, errorMessage: "게시글이 존재하지 않습니다." });
    }


    const posts = await Posts.find();
    const filteredPosts = posts.filter((e) => e["_id"].toString() === _postsId);
    const data = [
        {
            postsId: filteredPosts[0]._id.toString(),
            user: filteredPosts[0].user,
            title: filteredPosts[0].title,
            content: filteredPosts[0].content,
            createdAt: filteredPosts[0].createdAt,
        },
    ];


    res.json({ data });
});

// 게시글 작성 : /posts POST
router.post("/posts", async (req, res) => {
    const { _postsId, user, password, title, content } = req.body

    let now = new Date()
    const createdPosts = await Posts.create({ _id : _postsId, user : user, password : password, title : title, content : content, createdAt: now });

    res.json({ createdPosts: createdPosts });
});

// 게시글 수정 : /posts/:_postId PUT
router.put("/posts/:_postsId", async (req, res) => {

    const { _postsId } = req.params;

    const { password, title, content } = req.body;


    const currentPost = await Posts.find({ _id: (_postsId) });


    if (!currentPost.length) {
        return res.status(400).json({ success: false, errorMessage: "게시글이 존재하지 않습니다." });
    }


    await Posts.updateOne( { _id: _postsId, title : title, content : content });

    res.json({ result: "success" })
});

// 게시글 삭제 : /posts/:_postId DELETE
router.delete("/posts/:_postsId", async (req, res) => {

    const { _postsId } = req.params
    const { password } = req.body


    const currentPost = await Posts.find({ _id: _postsId });
    // console.log(currentPost)

    if (!currentPost.length) {
      return res.status(400).json({ success: false, errorMessage: "게시글이 존재하지 않습니다." });
    }

    if (password != currentPost[0]["password"]) {
      return res.status(400).json({ success: false, errorMessage: "비밀번호가 다릅니다." });
    }

    await Posts.deleteOne( { _id: _postsId});


    res.json({ result: "success" })
});

module.exports = router;