const express = require('express');
const router = express.Router();
const { getPosts, createPost, getPostById, getPostByCategory, searchPost, updatePost, deletePost } = require('../controllers/blog.controller');
const { createUser, getUsers, deleteUser, updatePassword } = require('../controllers/user.controller');
const { login } = require('../controllers/auth.controller');
const { verifyToken } = require('../auth/token_validation');
const { createCategory, getCategory, updateCategory, deleteCatgeory } = require('../controllers/category.controller');
const { tableCounts } = require('../controllers/table.controller')


// post routes
router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);
router.get('/posts/category/:category', getPostByCategory);
router.get('/posts/search/:keyword', searchPost);
router.post('/posts', verifyToken, createPost);
router.put('/posts', verifyToken, updatePost);
router.delete('/posts', verifyToken, deletePost);

//User routes
router.get('/user', getUsers);
router.post('/user', verifyToken, verifyToken, createUser);
router.put("/user", verifyToken, updatePassword);
router.delete("/user", verifyToken, deleteUser);

//Category routes
router.get('/category', getCategory);
router.post('/category', verifyToken, createCategory);
router.put('/category', verifyToken, updateCategory);
router.delete('/category', verifyToken, deleteCatgeory);

//Table routes
router.get('/table_count', tableCounts);

//Auth routes
router.post("/login", login);



module.exports = router;