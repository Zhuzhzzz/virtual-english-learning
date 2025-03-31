// #file: src/pages/DemoPage.js
import React, { useState, useEffect } from 'react';
import { wordService } from '../services/wordService';

function DemoPage() {
  const [currentWord, setCurrentWord] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [difficulty, setDifficulty] = useState('all');
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    loadNewWord();
  }, [difficulty]);

  const loadNewWord = async () => {
    let word;
    if (difficulty === 'all') {
      word = await wordService.getRandomWord();
    } else {
      const words = await wordService.getWordsByDifficulty(difficulty);
      word = words[Math.floor(Math.random() * words.length)];
    }
    setCurrentWord(word);
    setShowTranslation(false);
    setShowExample(false);
    setUserInput('');
    setShowResult(false);
  };

  const handleCheckAnswer = () => {
    setShowResult(true);
    const isAnswerCorrect = userInput.toLowerCase().trim() === currentWord.translation.toLowerCase().trim();
    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) {
      setScore(score + 1);
    }
    setTotalAttempts(totalAttempts + 1);
  };

  const handleNextWord = () => {
    loadNewWord();
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
    setScore(0);
    setTotalAttempts(0);
  };

  if (!currentWord) {
    return <div className="text-center">加载中...</div>;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="card-title mb-0">单词学习</h2>
              <select
                className="form-select w-auto"
                value={difficulty}
                onChange={handleDifficultyChange}
              >
                <option value="all">所有难度</option>
                <option value="easy">简单</option>
                <option value="medium">中等</option>
                <option value="hard">困难</option>
              </select>
            </div>

            <div className="text-center mb-4">
              <h3 className="display-4 mb-3">{currentWord.word}</h3>
              {showTranslation && (
                <p className="lead text-muted">{currentWord.translation}</p>
              )}
              {showExample && currentWord.example && (
                <p className="text-muted">{currentWord.example}</p>
              )}
            </div>

            <div className="mb-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="请输入中文翻译..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={showResult}
                />
                {!showResult ? (
                  <button
                    className="btn btn-primary"
                    onClick={handleCheckAnswer}
                  >
                    检查答案
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={handleNextWord}
                  >
                    下一个
                  </button>
                )}
              </div>
              {showResult && (
                <div className={`mt-2 text-center ${isCorrect ? 'text-success' : 'text-danger'}`}>
                  {isCorrect ? '回答正确！' : `回答错误，正确答案是：${currentWord.translation}`}
                </div>
              )}
            </div>

            <div className="d-flex justify-content-center gap-3 mb-4">
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowTranslation(!showTranslation)}
              >
                {showTranslation ? '隐藏翻译' : '显示翻译'}
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowExample(!showExample)}
              >
                {showExample ? '隐藏例句' : '显示例句'}
              </button>
            </div>

            <div className="text-center">
              <p className="mb-0">
                得分：{score} / {totalAttempts}
                {totalAttempts > 0 && (
                  <span className="ms-2">
                    (正确率：{Math.round((score / totalAttempts) * 100)}%)
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoPage;