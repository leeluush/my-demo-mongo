const mongoose = require('mongoose');



const url = process.env.MONGODB_URL || 'mongodb://localhost/my-example-app'
let connection;


async function connect() {
    try {
        const connection = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        require('./user.js')
        require('./todo.js')
        require('./post.js')
        require('./category.js')
        require('./user-token.js')

        console.log('connection to mongo succeed');
    } catch (err) { 
      
        console.log(`failed to connect to mongo ${err}`)
        process.exit(1);
    }

}

module.exports = connect;