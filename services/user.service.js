const pool = require('../config/database');


module.exports = {

    getUsers: (callBack) => {

        pool.query('SELECT * FROM users', (err, results) => {

            if (err) {
                console.log(err);
                callBack(err);
            }

            return callBack(null, results);
        });
    },

    getUserByID: (id, callBack) => {

        try {
            pool.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {

                if (err) {
                    console.log(err);
                    return callBack(err);
                }

                return callBack(null, results[0]);
            });

        } catch (error) {
            console.log(error);
        }

    },

    createUser: (data, callBack) => {

        pool.query('INSERT INTO users(fullname,email,password,is_admin) VALUES(?,?,?,?)', [data.fullname, data.email, data.password, data.is_admin], (err, results) => {

            if (err) {
                console.log(err);
                callBack(err);
            }

            return callBack(null, results);
        });
    },

    updatePassword: (data, callBack) => {

        pool.query('UPDATE users set password = ? where id = ?', [data.password, data.id], (err, results) => {

            if (err) {
                console.log(err);
                callBack(err);
            }

            return callBack(null, results);
        });
    },

    deleteUser: (id, callBack) => {

        pool.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {

            if (err) {
                console.log(err);
                callBack(err);
            }

            return callBack(null, results);
        });
    },

    getUserByEmail: (email, callBack) => {

        pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {

            if (err) {
                console.log(err);
                callBack(err);
            }

            return callBack(null, results[0]);
        });

    },


}