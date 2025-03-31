// 模拟数据库
let words = [
  { id: 1, word: 'Hello', translation: '你好', example: 'Hello, how are you?', difficulty: 'easy' },
  { id: 2, word: 'World', translation: '世界', example: 'Hello, world!', difficulty: 'easy' },
  { id: 3, word: 'Computer', translation: '计算机', example: 'I love my computer.', difficulty: 'medium' },
];

export const wordService = {
  // 获取所有单词
  getAllWords: () => {
    return Promise.resolve(words);
  },

  // 添加新单词
  addWord: (newWord) => {
    const word = {
      id: words.length + 1,
      ...newWord,
      difficulty: newWord.difficulty || 'medium'
    };
    words.push(word);
    return Promise.resolve(word);
  },

  // 获取随机单词
  getRandomWord: () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return Promise.resolve(words[randomIndex]);
  },

  // 按难度获取单词
  getWordsByDifficulty: (difficulty) => {
    const filteredWords = words.filter(word => word.difficulty === difficulty);
    return Promise.resolve(filteredWords);
  },

  // 搜索单词
  searchWords: (query) => {
    const results = words.filter(word => 
      word.word.toLowerCase().includes(query.toLowerCase()) ||
      word.translation.includes(query)
    );
    return Promise.resolve(results);
  }
}; 