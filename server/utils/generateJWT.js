const jwt = require('jsonwebtoken');

module.exports =  function (id, login, name) {
    let expiresIn = '7d';
    // if (role === 'ADMIN') {
    //     expiresIn = '1h';
    // }
    return jwt.sign(
        {
            id,
            login,
            name
        },
        process.env.SECRET_KEY,
        { expiresIn }
    )
}