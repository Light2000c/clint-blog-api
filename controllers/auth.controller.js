const { getUserByEmail } = require("../services/user.service");
const { compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    login: (req, res) => {

        let data = req.body;
        let secret = process.env.SECRET_KEY;

        getUserByEmail(data.email, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }

            if (!results) {
                return res.json({
                    status: 'fail',
                    message: 'Invalid login credentials.',
                });
            }

            password_confirmed = compareSync(data.password, results.password);

            if (!password_confirmed) {
                return res.json({
                    status: 'fail',
                    message: 'Invalid login credentials.',
                });
            }

            results.password = '';
            
            let token = sign({result: results}, secret, { expiresIn: '30m'});

            results.token = token;

            return res.json({
                status: 'success',
                data: results,
            });
        });
    }
}