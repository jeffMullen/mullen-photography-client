const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {
    await User.deleteMany();

    await User.create({
        username: 'Jeff Mullen',
        email: 'jeff@jeff.com',
        password: 'password12345',
    });

    console.log('users seeded');

    process.exit();
});