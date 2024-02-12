const pool = require('../config/database');


module.exports = {

    tablesCount: (callBack) => {

        pool.query(
            'SELECT (SELECT COUNT(title) FROM posts) AS post_count,  (SELECT COUNT(title) FROM categories) AS category_count, (SELECT COUNT(fullname) FROM users) AS user_count;', 
            (err, results) => {

                if(err){
                    console.log(err);
                    callBack(error)
                }

                return callBack(null, results[0])
        });

    }
}

