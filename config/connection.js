const { connect, connection } = require('mongoose');
console.log('jos');

connect('mongodb://127.0.0.1:27017/networkSocial', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

console.log('e');
module.exports = connection;