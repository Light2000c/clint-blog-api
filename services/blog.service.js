const pool = require('../config/database');



module.exports = {

    getPosts: (callBack) => {

        try {

            pool.query('SELECT * FROM posts', (err, results) => {

                if (err) {
                    return callBack(err)
                }

                return callBack(null, results);
            })

        } catch (error) {
            console.log(error);
        }
    },


    getPostById: (id, callBack) => {

        try {


            pool.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {

                if (err) {
                    return callBack(err)
                }

                return callBack(null, results);
            })

        } catch (error) {
            console.log(error);
        }
    },


    getPostByCategory: (category, callBack) => {

        try {


            pool.query('SELECT * FROM posts WHERE category = ?', [category], (err, results) => {

                if (err) {
                    return callBack(err)
                }

                return callBack(null, results);
            })

        } catch (error) {
            console.log(error);
        }
    },


    createPost: (data, callBack) => {

        try {
            pool.query('INSERT INTO posts(title,category,image,description) VALUES(?,?,?,?)',
                [data.title, data.category, data.image, data.description, data.created_by], (err, results) => {

                    if (err) {
                        console.log(err);
                        callBack(err);
                    }

                    return callBack(null, results);
                });

        } catch (error) {
            console.log(error);
        }
    },

    updatePost: (data, callBack) => {

        try {
        pool.query(`UPDATE posts set title = ?, category = ?, image= ?, description = ? Where id = ?`,
            [data.title, data.category, data.image, data.description, data.id, data.created_by], (err, results) => {

                if (err) {
                    console.log(err);
                    callBack(err);
                }

                console.log(results);
                return callBack(null, results);
            });
        } catch (error) {
            console.log(error);
        }

    },

    updatePostWithoutImage: (data, callBack) => {

        try {
        pool.query(`UPDATE posts set title = ?, category = ?, description = ? Where id = ?`,
            [data.title, data.category, data.description, data.id], (err, results) => {

                if (err) {
                    console.log(err);
                    callBack(err);
                }

                console.log(results);
                return callBack(null, results);
            });
        } catch (error) {
            console.log(error);
        }

    },



    deletePost: (id, callBack) => {

        try {

            pool.query('DELETE FROM posts WHERE id = ?', [id], (err, results) => {

                if (err) {
                    console.log(err);
                    callBack(err);
                }

                console.log(results.affectedRows);
                return callBack(null, results);
            });

        } catch (error) {
            console.log(error);
        }

    },



    searchPost: (keyword, callBack) => {

        pool.query('SELECT * FROM posts where title LIKE ? OR description LIKE ?', ['%' + keyword + '%', '%' + keyword + '%'], (err, results) => {

            if(err){
                console.log(err);
                callBack(err);
            }

            return callBack(null, results);
        });
    }

}