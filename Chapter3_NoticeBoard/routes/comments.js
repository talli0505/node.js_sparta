// 댓글 생성 : /comments/:_postId POST
// 댓글 목록 조회: /comments/:_postId GET
// 댓글 수정 : /comments/:_commentId PUT
// 댓글 삭제 : /comments/:_commentId DELETE

const express = require("express");
const Posts = require("../schemas/post")
const Comment = require("../schemas/comment");
const router = express.Router();

// 댓글 생성 : /comments/:_postId POST
router.post("/comments/:postId", async (req, res) => {
    const { postId } = req.params;
    const { user, password, content } = req.body
    const CurrentPosts = await Posts.find({ _id: postId });

    if (!CurrentPosts.length) {
      return res.status(400).json({ success: false, errorMessage: "게시글이 존재하지 않습니다." });
    }

    let now = new Date()
    await Comment.create({ postId: postId, user : user, password : password, content : content, createdAt : now });

    
    res.json({ "message" : "댓글을 생성하였습니다." })
});

// 댓글 보여주기
router.get("/comments/:postId", async (req, res) => {

  const { postId } = req.params; 


  const currentPosts = await Posts.find({ _id: postId });


  if (!currentPosts.length) {
    return res.status(400).json({ success: false, errorMessage: "게시글이 존재하지 않습니다." });
  }


  const allCommentInfo = await Comment.find({ postId : postId }).sort({ createdAt: -1 })
  // console.log(allCommentInfo)

  // const filteredComments = comments.filter((e) => e["_id"].toString() === postId);
  const data = [];

  for (let i = 0; i < allCommentInfo.length; i++) {
    data.push({
        commentId: allCommentInfo[i]._id.toString(),
        user: allCommentInfo[i].user,
        content: allCommentInfo[i].content,
        createdAt: allCommentInfo[i].createdAt,
    });
}

  res.json({ data: data });
});

// 댓글 수정 : /comments/:_commentId PUT
router.put("/comments/:commentId", async (req, res) => {
    const { commentId } = req.params
    const { password, content } = req.body
    const currentComments = await Comment.find({ _id: commentId });
    console.log(currentComments)


    if (!currentComments.length) {
      return res.status(400).json({ success: false, errorMessage: "댓글이 존재하지 않습니다." });
    }


    await Comment.updateOne(
      {
          _id: commentId,
      },
      {

          $set: {
              password: password,
              content: content,
          },
      }
  );


    res.json({ "message" : "댓글을 수정하였습니다." })
});



// 댓글 삭제 : /comments/:_commentId DELETE
router.delete("/comments/:commentId", async (req, res) => {

    const { commentId } = req.params
    const { password } = req.body


    const currentComments = await Comment.find({ _id: commentId });


    if (!currentComments.length) {
      return res.status(400).json({ success: false, errorMessage: "댓글이 존재하지 않습니다." });
    }

    if (password != currentComments[0]["password"]) {
      return res.status(400).json({ success: false, errorMessage: "비밀번호가 다릅니다." });


    }
    await Comment.deleteOne({ _id: commentId });

    res.json({ "message" : "댓글을 삭제하였습니다." })
});
module.exports = router;
