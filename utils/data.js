const usernames = [
    'john',
    'jane',
    'bob',
    'joe',
    'jill',
    'bill',
    'ted',
    'ann',
    'beth',
    'sam',
    'sarah',
    'mike',
    'matt',
  ];
  
  const thoughtText = [
    'Hello world!',
    'Hi, there!',
    'How are you?',
    'I am doing well.',
    'I am doing ok.',
    'I am doing great!',
    'I am doing terrible.',
    'I am doing so-so.',
    'I am doing awesome!',
    'I am doing awful.',
    'I am doing bad.',
    'I am doing good.',
    'I am doing fine.',
    'I am doing alright.',
  ];
  
  const reactions = ['html', 'css', 'javascript', 'node', 'express', 'react'];
  
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  const getRandomName = () => {
    const username1 = getRandomArrItem(usernames);
    const username2 = getRandomArrItem(usernames);
    return `${username1} ${username2}`;
  };
  
  const getRandomThoughts = (count) => {
    const results = [];
    for (let i = 0; i < count; i++) {
      const thought = {
        published: Math.random() < 0.5,
        description: getRandomArrItem(thoughtText),
        buildSuccess: Math.random() < 0.5,
        reactions: getThoughtReactions(Math.floor(Math.random() * 4)),
      };
      results.push(thought);
    }
    return results;
  };
  
  const getThoughtReactions = (count) => {
    const results = [];
    for (let i = 0; i < count; i++) {
      const reaction = {
        tagBody: getRandomArrItem(reactions),
        username: getRandomName(),
      };
      results.push(reaction);
    }
    return results;
  };
  
  const generateUniqueEmail = () => {
    const domain = 'example.com';
    const randomString = Math.random().toString(36).substring(7);
    return `${randomString}@${domain}`;
  };
  
  const users = [];
  
  users.push({
    username: getRandomName(),
    email: generateUniqueEmail(),
  });
  
  module.exports = { getRandomName, getRandomThoughts };
  
  