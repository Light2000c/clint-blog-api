const { getPosts, createPost, getPostById, getPostByCategory, updatePost, updatePostWithoutImage, deletePost, searchPost } = require('../services/blog.service');
const path = require('path');


const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/'),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
    fileFilter: function (req, file, cb) {
        fileFilter(file, cb);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 },
}).single("image");

const updateUpload = multer({
    storage: storage,
    limits: { fileSize: 2000000 },
}).single("image");



module.exports = {
    getPosts: (req, res) => {

        getPosts((err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                status: "success",
                data: results,
            });
        });
    },

    getPostById: (req, res) => {

        let id = req.params.id;

        getPostById(id, (err, results) => {

            if (err) {
                return res.json({
                    status: 'fail',
                    message: 'Something went wrong, please try again.'
                });
            }

            if (!results) {
                return res.json({
                    status: 'fail',
                    message: 'post was not found.'
                });
            }

            return res.json({
                status: 'success',
                data: results[0],
            });


        });
    },


    getPostByCategory: (req, res) => {

        let category =  req.params.category;

        getPostByCategory(category, (err, results) => {

            if(err){
                console.log(err);
                return;
            }

            if(!results){
                return res.json({
                    status: 'fail',
                    message: 'category not found',
                });
            }

            return res.json({
                status: 'success',
                data: results,
            });
        });
    },


    searchPost: (req, res) => {
        
        let keyword = req.params.keyword;

        searchPost(keyword, (err, results) => {

            if(err){
                console.log(err);
                return;
            }

            if(!results){
                return res.json({
                    status: 'fail',
                    message: `No record found for ${keyword}`
                });
            }

            return res.json({
                status: 'success',
                data: results,
            });
        });
    },


    createPost: (req, res) => {


        upload(req, res, function (err) {

            const body = req.body;

            console.log("Body title ==> ", body);

            if (err instanceof multer.MulterError) {
                // A Multer error occurred during file upload
                return res.status(400).json({ error: err.message });
            }


            if (err) {
                console.log(err);
                return res.json({
                    status: "fail",
                    message: "Couldn't fetch blog post"
                });
            }

            // console.log(req.file);

            if (req.file == undefined) {
                console.log(err);
                return res.json({
                    status: "fail",
                    message: "Could not find file"
                });
            }

            body.image = req.file.filename;

            createPost(body, (err, results) => {

                if (err) {
                    console.log(err);
                    return res.json({
                        status: "fail",
                        message: "Something went wrong, please try again."
                    });
                }

                if (!results) {
                    return res.json({
                        status: "fail",
                        message: "Couldn't add posts."
                    });
                }

                return res.json({
                    status: "success",
                    message: "Post has been successfully added."
                });

            });

        });

    },

    updatePost: (req, res) => {


        updateUpload(req, res, function (err) {

            let body = req.body;

            console.log("Body is ==> ", req.body);


            if (err) {
                return res.json({
                    status: 'fail',
                    message: 'Something went wrong, please try again.'
                });
            }


            if (req.file) {
                console.log("There's file");
                body.image = req.file.filename;

                updatePost(body, (error, results) => {
                    if (error) {
                        console.log(error);
                        return;
                    }


                    if (results.affectedRows <= 0) {
                        return res.json({
                            status: "fail",
                            message: "Post was not successfully updated."
                        });
                    }

                    return res.json({
                        status: 'success',
                        message: 'Post has been successfully updated'
                    });
                });
            } else {
                updatePostWithoutImage(body, (error, results) => {
                    if (error) {
                        console.log(error);
                        return;
                    }


                    if (results.affectedRows <= 0) {
                        return res.json({
                            status: "fail",
                            message: "Post was not successfully updated."
                        });
                    }

                    return res.json({
                        status: 'success',
                        message: 'Post has been successfully updated'
                    });
                });
            }


        });
    },



    deletePost: (req, res) => {

        let id = req.body.id;

        deletePost(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(results);

            if (results.affectedRows <= 0) {
                return res.json({
                    status: 'fail',
                    message: 'Post was not sucessfully deleted',
                });
            }

            return res.json({
                status: 'success',
                message: 'Post was sucessfully deleted',
            });

        });
    }

}



function fileFilter(req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return cb(new Error('Only images are allowed'));
    }

    cb(null, true);
}
