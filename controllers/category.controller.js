const { createCategory, getCategory, updateCategory, deleteCategory } = require('../services/category.service');

module.exports = {

    getCategory: (req, res) => {

        getCategory((err, results) => {

            if(err){
                console.log(err);
                return;
            }
    
            if(!results){
                return res.json({
                    status: "fail",
                    message: "Something went wrong, please try again."
                });
            }
    
            return res.json({
                status: "success",
                data: results,
            });
        });
        
 
    },

    createCategory: (req, res) => {

        let body  = req.body;

        console.log("body is ==> ", body);

        createCategory(body,(err, results) => {

            if(err){
                console.log(err);
                return
            }

            if(!results){
                return res.json({
                    status: "fail",
                    message: "Something went wrong, please try again."
                });
            }

            return res.json({
                status: "success",
                message: "Category has been successfully added.."
            });
        });

    },


    updateCategory:  (req, res) => {

        let body = req.body;

        updateCategory(body,(err, results) => {

            if(err){
                console.log(err);
                return
            }

            if(results.affectedRows <= 0){
                return res.json({
                    status: 'fail',
                    message: "Category not found",
                });
            }

            return res.json({
                status: 'success',
                message: "Category has been successfully updated.",
            });
        });
    },

    deleteCatgeory: (req, res) => {
        
        let body = req.body;

        deleteCategory(body, (err, results) => {

            if(err){
                console.log(err);
                return;
            }

            if(results.affectedRows <= 0){
                return res.json({
                    status: 'fail',
                    message: "Category not found",
                });
            }

            return res.json({
                status: "success",
                message: "Category has been successfully deleted."
            });
        });
    }


}