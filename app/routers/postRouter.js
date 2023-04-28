const router = require('express').Router();
const postController = require('../controllers/postController');


router.post('/createPost',postController.createPost);
router.get('/getPosts',postController.getAllPosts);

module.exports = router;