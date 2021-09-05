const router = require('express').Router();
//Connects to the Connects.js file in Config Folder
const sequelize = require('../config/connection');
//PUlls in Post, User, and Comment Models
const { Post, User, Comment } = require('../models');
//Authentication
const withAuth = require('../utils/auth');

//This will get all posts for the dashboards with Authentication
router.get('/', withAuth, (req, res) => {
    // console.log(req.session);
    // console.log('======================');
    Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;