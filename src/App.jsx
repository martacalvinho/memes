import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from './styles/theme.jsx';
import HomePage from './pages/HomePage';
import BattlePage from './pages/BattlePage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/battle/:id" element={<BattlePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
