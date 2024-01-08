const { createUser, getUsers, deleteUser } = require('../services/user.service');

const { hashSync, genSaltSync } = require('bcrypt');

module.exports = {

    getUsers: (req, res) => {


        getUsers((err, results) => {

            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                status: 'success',
                data: results,
            });

        });
    },

    createUser: (req, res) => {

        let body = req.body;

        let salt = genSaltSync(10);

        body.password = hashSync(body.password, salt);
        body.is_admin = 1;

        createUser(body, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }

            if (!results) {
                return res.json({
                    status: 'fail',
                    message: 'User was not successfully added to database',
                });
            }

            return res.json({
                status: 'success',
                message: 'User has been successfully added to database',
            });

        });
    },

    deleteUser: (req, res) => {

        let id = req.body.id;

        deleteUser(id, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }
            console.log(results);

            if (results.affectedRows <= 0) {
                return res.json({
                    status: "fail",
                    message: "User was not found",
                });
            }

            return res.json({
                status: "success",
                message: "User has been deleted",
            });

        });
    }

    
}