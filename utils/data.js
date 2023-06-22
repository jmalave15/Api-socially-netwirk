const usernames = [
    'john',
    'jane',
    'bob',
    'joe',
    'jill',
    'bill',
    'ted',
    'sue',
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
  
  const getRandomName = () => `${getRandomArrItem(usernames)} ${getRandomArrItem(usernames)}`;
  
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
  
  module.exports = { getRandomName, getRandomThoughts };
  