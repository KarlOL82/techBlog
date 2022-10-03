const router = require('express').Router();


const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
    try {
      const comments = await Comment.findAll();
      console.log(req.body,"Comment-get") 
  
      res.status(200).json(comments);   
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.post('/new', withAuth, async (req, res) => {
  console.log("Comment-post",req.body,"------")
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newComment);
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    const postData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "Comment not found!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});







module.exports = router;