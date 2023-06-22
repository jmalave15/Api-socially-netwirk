const mongoose = require('mongoose');
const connection = require('../config/connection');
const { user, thought } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data')

mongoose.set('strictQuery', false);

connection.once('open', async () => {
    console.log('connection open');
    
    await thought.deleteMany({});
    await user.deleteMany({});

    const users = [];
    const Thoughts = getRandomThoughts(10);

    for (let i = 0; i < 10; i++) {
        const username = getRandomName();

        users.push({ 
            username,
        });
    }

    await user.collection.insertMany(users);
    await thought.collection.insertMany(Thoughts);

    console.table(users);
    console.table(Thoughts);
    console.info('Seed complete!');
    process.exit(0);
});