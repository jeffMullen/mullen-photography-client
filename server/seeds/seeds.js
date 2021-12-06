const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
    await User.deleteMany();

    await User.create({
        username: 'Jeff Mullen',
        email: 'jeff@jeff.com',
        password: 'password12345',
        photos: [
            {
                fileName: 'portland.jpeg',
                title: 'Portland',
                description: "Al's Den in downtown Portland"
            }
        ]
    });

    console.log('users seeded');

    process.exit();
});