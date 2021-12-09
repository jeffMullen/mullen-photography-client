const db = require('../config/connection');
const { User, Photo, MullenPhoto } = require('../models');
const mongoose = require('mongoose');

db.once('open', async () => {
    await User.deleteMany();
    await Photo.deleteMany();

    await User.create({
        username: 'Jeff Mullen',
        email: 'jeff@jeff.com',
        password: 'password12345',
    });

    await Photo.insertMany([
        {
            photographer: 'Jeff Mullen',
            fileName: 'portland.jpeg',
            title: 'Portland',
            description: "Al's Den in downtown Portland",
            category: 'Urban'
        },
        {
            photographer: 'Mr. Rodgers',
            fileName: 'wholesome.jpeg',
            title: 'A land beyond',
            description: 'Going to a beautiful place',
            category: 'Landscape'
        }
    ]);

    await MullenPhoto.insertMany([
        {
            photographer: 'Jeff Mullen',
            fileName: 'portland.jpeg',
            title: 'Portland',
            description: "Al's Den in downtown Portland",
            category: 'Urban'
        },
    ])

    const users = await User.find();
    console.log('users', users)
    const photos = await Photo.find();
    console.log('photos', photos);


    // users.forEach(async (user) => {
    //     photos.forEach(async (photo) => {
    //         if (photos.photographer === user.username) {
    //             return await User.findByIdAndUpdate(
    //                 user._id,
    //                 { $push: { photos: { ...photo } } },
    //                 { new: true }
    //             )
    //         }
    //     })
    // })

    for (const user of users) {
        for (const photo of photos) {
            if (user.username === photo.photographer) {
                console.log(user.username)
                console.log(photo.photographer)
                await User.findByIdAndUpdate(
                    user._id,
                    { $push: { photos: photo } },
                    { new: true }
                )
            }
        }
    }

    console.log('Updated users', users)

    //  Testing find method with arguments
    // const category = await Photo.find({ category: 'Urban' });
    // console.log('category', category)
    // const photos = await Photo.find({ photographer: 'Mr. Rodgers' });
    // console.log('Mr. Rodgers', photos)


    console.log('db seeded');

    process.exit();
});