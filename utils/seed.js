const mongoose = require('mongoose');
const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

mongoose.set('strictQuery', false);

connection.once('open', async () => {
  console.log('Connection opened');

  try {
    await Thought.deleteMany({});
    await User.deleteMany({});

    const users = [];
    const thoughts = getRandomThoughts(10);

    for (let i = 0; i < 10; i++) {
      const username = getRandomName();

      users.push({
        username,
        email: generateUniqueEmail(),
      });
    }

    const createdUsers = await User.insertMany(users);
    const userIds = createdUsers.map((user) => user._id);

    thoughts.forEach((thought) => {
      thought.userId = getRandomArrItem(userIds);
    });

    await Thought.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.log('Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seed:', error);
    process.exit(1);
  }
});

const generateUniqueEmail = () => {
  const domain = 'example.com';
  const randomString = Math.random().toString(36).substring(7);
  return `${randomString}@${domain}`;
};
