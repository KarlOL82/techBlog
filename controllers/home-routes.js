const router = require("express").Router();

const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "postText", "created_at"],
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],

      
      order: [["created_at", "DESC"]],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("homepage", {
        posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render("login");
  });

router.get("/signup", (req, res) => {
    
  if (req.session.logged_in) {
      res.redirect("/");
      return;
    }
    
     res.render("signup");
  });


  router.get("/profile", withAuth, async (req, res) => {

    try {
      
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        include: [
          { 
            model: Post,
          }
        ],
        order: [[Post, 'updated_at', 'DESC']],
      });
  
      const user = userData.get({ plain: true });
  
      res.render("profile", {
        ...user,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ['id', 'content', 'user_id', 'created_at'],
          include: [
            {
              model: User,
              attributes: ["username"]
            }
          ]
        },
      ],
    });

    const post = postData.get({ plain: true });

    console.log(post);

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
      logged_in_user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    const post = postData.get({ plain: true });

    res.render('editPost', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
