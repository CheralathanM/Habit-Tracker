import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <div className={`ac ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <div className="container">
          <h1>Habit Tracker</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/HabitTracker">Track Habits</Link></li>
              <li><Link to="/Videos">Videos</Link></li>
              <div className="header-right">
                <button className="toggle-mode" onClick={toggleDarkMode}>Toggle Mode</button>
                <button className="sign-up"><Link to="/SignIn">Sign-In</Link></button>
              </div>
            </ul>
          </nav>
        </div>
      </header>
      
      <section className="intro">
        <div className="container">
          <h2>Welcome to Habit Tracker!</h2>
          <p>Track and improve your habits every day. Stay consistent and achieve your goals!</p>
          <Link to="/HabitTracker" className="track">Start Tracking</Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Features</h2>
          <div className="feature-item">
            <h3>Daily Habit Tracker</h3>
            <p>Log your daily habits and keep track of your progress over time.</p>
          </div>
          <div className="feature-item">
            <h3>Statistics</h3>
            <p>Get detailed insights into your habit progress with visual statistics.</p>
          </div>
          <div className="feature-item">
            <h3>Videos to stay Focused</h3>
            <p>Watch the videos that available here to focus on the particular work.</p>
          </div>
          <div className="feature-item">
            <h3>Reminder Notifications</h3>
            <p>Set reminders for your habits and stay on track with daily notifications.</p>
          </div>
        </div>
      </section>
      
      <footer>
        <div className="container">
          <p>&copy; 2025 Habit Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
