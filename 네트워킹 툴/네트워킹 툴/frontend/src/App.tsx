import React, { useState } from 'react';
import MyPage from './pages/MyPage';
import DirectoryHub from './pages/DirectoryHub';
import OpportunityBoardPage from './pages/OpportunityBoardPage';

const navItems = [
  { key: 'mypage', label: '마이페이지' },
  { key: 'directory', label: '동문/원우 허브' },
  { key: 'opportunity', label: '기회 보드' }
];

function App() {
  const [page, setPage] = useState('mypage');
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <nav style={{ width: 200, background: '#f5f5f5', padding: 24 }}>
        <h2>KDT 네트워킹</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {navItems.map(item => (
            <li key={item.key}>
              <button style={{ width: '100%', padding: 8, margin: '8px 0', background: page === item.key ? '#e0e0e0' : 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer' }} onClick={() => setPage(item.key)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main style={{ flex: 1, padding: 32, background: '#fff' }}>
        {page === 'mypage' && <MyPage />}
        {page === 'directory' && <DirectoryHub />}
        {page === 'opportunity' && <OpportunityBoardPage />}
      </main>
    </div>
  );
}

export default App; 