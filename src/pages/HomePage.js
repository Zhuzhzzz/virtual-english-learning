import React from 'react';
import { Link } from 'react-router-dom';
import { wordService } from '../services/wordService';

function HomePage() {
  const [stats, setStats] = React.useState({
    totalWords: 0,
    easyWords: 0,
    mediumWords: 0,
    hardWords: 0
  });

  React.useEffect(() => {
    const loadStats = async () => {
      const words = await wordService.getAllWords();
      setStats({
        totalWords: words.length,
        easyWords: words.filter(w => w.difficulty === 'easy').length,
        mediumWords: words.filter(w => w.difficulty === 'medium').length,
        hardWords: words.filter(w => w.difficulty === 'hard').length
      });
    };
    loadStats();
  }, []);

  return (
    <div className="home-page">
      <div className="hero-section text-center py-5 mb-5">
        <h1 className="display-3 fw-bold mb-4">虚拟人英语单词学习平台</h1>
        <p className="lead text-muted mb-4">让学习英语变得简单有趣</p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card h-100 feature-card">
            <div className="card-body text-center">
              <div className="feature-icon mb-3">
                <i className="fas fa-book-reader fa-3x text-primary"></i>
              </div>
              <h3 className="card-title">单词学习</h3>
              <p className="card-text">通过智能系统学习英语单词，提高记忆效率</p>
              <Link to="/demo" className="btn btn-outline-primary">
                开始学习
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 feature-card">
            <div className="card-body text-center">
              <div className="feature-icon mb-3">
                <i className="fas fa-edit fa-3x text-primary"></i>
              </div>
              <h3 className="card-title">单词管理</h3>
              <p className="card-text">添加、编辑和管理你的单词库</p>
              <Link to="/annotate" className="btn btn-outline-primary">
                管理单词
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 feature-card">
            <div className="card-body text-center">
              <div className="feature-icon mb-3">
                <i className="fas fa-chart-line fa-3x text-primary"></i>
              </div>
              <h3 className="card-title">学习统计</h3>
              <p className="card-text">追踪你的学习进度和效果</p>
              <Link to="/demo" className="btn btn-outline-primary">
                查看统计
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-8 mx-auto">
          <div className="card stats-card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">学习统计</h3>
              <div className="row text-center">
                <div className="col-md-3">
                  <div className="stat-item">
                    <h4 className="text-primary">{stats.totalWords}</h4>
                    <p className="text-muted">总单词数</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="stat-item">
                    <h4 className="text-success">{stats.easyWords}</h4>
                    <p className="text-muted">简单</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="stat-item">
                    <h4 className="text-warning">{stats.mediumWords}</h4>
                    <p className="text-muted">中等</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="stat-item">
                    <h4 className="text-danger">{stats.hardWords}</h4>
                    <p className="text-muted">困难</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card tips-card">
            <div className="card-body">
              <h3 className="card-title">学习技巧</h3>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  每天固定时间学习，保持学习习惯
                </li>
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  结合例句理解单词用法
                </li>
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  定期复习已学过的单词
                </li>
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  根据难度分级学习
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card tips-card">
            <div className="card-body">
              <h3 className="card-title">使用说明</h3>
              <ol className="list-unstyled">
                <li className="mb-3">
                  <span className="badge bg-primary me-2">1</span>
                  在"管理单词"中添加新单词
                </li>
                <li className="mb-3">
                  <span className="badge bg-primary me-2">2</span>
                  选择适合的难度级别
                </li>
                <li className="mb-3">
                  <span className="badge bg-primary me-2">3</span>
                  在"开始学习"中进行练习
                </li>
                <li className="mb-3">
                  <span className="badge bg-primary me-2">4</span>
                  查看学习统计和进度
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage; 