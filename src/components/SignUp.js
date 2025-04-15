import React from 'react';
import { Link } from 'react-router-dom';
import styles from './signup.module.css';
import loginImg from './loginpagephoto.jpg';

const SignUp = () => {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.leftBox}>
        <img src={loginImg} alt="Login Visual" />
        </div>
        <div className={styles.rightBox}>
          <div className={styles.signUp}>
            <h1>Sign Up</h1>

            <label htmlFor="firstName">Full Name</label>
            <input type="text" id="firstName" placeholder="Name..." />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email address..." />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Username..." />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="•••••••" />

            <label htmlFor="repeatPassword">Repeat Password</label>
            <input type="password" id="repeatPassword" placeholder="•••••••" />

            <input type="checkbox" />
            <label htmlFor="agree">I agree to the <b>Terms of User</b></label>
          </div>

          <div className={styles.button}>
            <button>Sign Up</button>
            <Link to="/SignIn">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
