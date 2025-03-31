// #file: src/pages/AnnotatePage.js
import React, { useState, useEffect } from 'react';
import { wordService } from '../services/wordService';

function AnnotatePage() {
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [example, setExample] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [words, setWords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    loadWords();
  }, []);

  const loadWords = async () => {
    const allWords = await wordService.getAllWords();
    setWords(allWords);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await wordService.addWord({
        word,
        translation,
        example,
        difficulty
      });
      setWord('');
      setTranslation('');
      setExample('');
      setDifficulty('medium');
      loadWords();
    } catch (error) {
      console.error('添加单词失败:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await wordService.searchWords(searchQuery);
    setSearchResults(results);
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">添加新单词</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="word" className="form-label">英文单词</label>
                <input
                  type="text"
                  className="form-control"
                  id="word"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="translation" className="form-label">中文翻译</label>
                <input
                  type="text"
                  className="form-control"
                  id="translation"
                  value={translation}
                  onChange={(e) => setTranslation(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="example" className="form-label">例句</label>
                <textarea
                  className="form-control"
                  id="example"
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                  rows="3"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="difficulty" className="form-label">难度</label>
                <select
                  className="form-select"
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="easy">简单</option>
                  <option value="medium">中等</option>
                  <option value="hard">困难</option>
                </select>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  添加单词
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">搜索单词</h2>
            <form onSubmit={handleSearch} className="mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="输入英文或中文搜索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-outline-primary">
                  搜索
                </button>
              </div>
            </form>

            <div className="list-group">
              {(searchQuery ? searchResults : words).map((word) => (
                <div key={word.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-1">{word.word}</h5>
                      <p className="mb-1">{word.translation}</p>
                      {word.example && (
                        <small className="text-muted">{word.example}</small>
                      )}
                    </div>
                    <span className={`badge bg-${word.difficulty === 'easy' ? 'success' : word.difficulty === 'medium' ? 'warning' : 'danger'}`}>
                      {word.difficulty === 'easy' ? '简单' : word.difficulty === 'medium' ? '中等' : '困难'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnotatePage;