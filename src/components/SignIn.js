import React from 'react';
import styles from './Signstyle.module.css';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Sign In</h1>
          </div>
          <div className={styles.input}>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#!">Forgot Password?</a>
          </div>
          <div className={styles.buttons}>
            <button>Sign In &#8658;</button>
          </div>
          <div className={styles.paragraph}>
            <span>or sign in with</span>
          </div>
          <div className={styles.button1}>
            <button id={styles.but1}>Facebook</button>
            <button id={styles.but2}>Google</button>
          </div>
          <div className={styles.paragraph1}>
            <span>
              Not a Member?<Link to="/SignUp" className={styles.signUp}>Click here</Link>

            </span>
          </div>
          <div className={styles.home}>
            <Link to="/">Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
