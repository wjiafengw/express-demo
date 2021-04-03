const models = require('./model')

function createUser(username, password) {
    const user = new models.userModel({
        username: username,
        password: password
    })
    return new Promise((resolve, reject) => {
        user.save((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}

function findUser(username, password) {
    /*const user = new models.userModel({
        username: username,
        password: password
    })*/

    var query = models.userModel.findOne({'username': username, 'password': password});

    /*  query.exec(function (err, user) {
          if (err) return handleError(err);
          // Prints "Space Ghost is a talk show host."
          console.log('%s %s', user.username, user.password);
          return true;
      });*/

    return new Promise((resolve, reject) => {
        query.exec(function (err, user) {
            if (err) {
                reject(err);
            } else {
                if(user){
                    resolve(true);
                }else{
                   reject();
                }

            }
        })
    })
}


function findUserByUsername(username) {
    var query = models.userModel.findOne({'username': username});
    return new Promise((resolve, reject) => {
        query.exec(function (err, user) {
            if (err) {
                reject(err);
            } else {
                if(user){
                    resolve(true);
                }else{
                    reject();
                }
            }
        })
    })
}




module.exports = {
    createUser,
    findUser,
    findUserByUsername,
}
