import React, { useEffect, useState } from "react";
import Link from 'next/link'
import { auth, registerWithEmailAndPassword } from "../services/firebase";
import styles from './Registration.module.css'
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";


function Register() {
    // const router = useRouter()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // useEffect(() => {
  //     if (loading) {
  //         // maybe trigger a loading screen
  //         return;
  //     }
  //     if (user) {
  //         return(
  //             router.push('/dashboard')
  //         )
  //     }
  // }, [user, loading]);
  const register = () => {
    if (!username) alert("Please enter username");
    else if (password != confirmPassword) alert("Password must be same with Confirm Password");
    else registerWithEmailAndPassword(username, email, password, confirmPassword);
  };

  const onChange =(e) => {
    if (!e.target.validity.patternMismatch) {
      setUsername(e.target.value);
    }
  }

  return (
    <div className={styles.register}>
      <div className={styles.register__container}>
        <input
          type="text"
          maxLength={30}
          pattern="^[a-z0-9_.]*$"
          className={styles.register__textBox}
          value={username}
          onChange={onChange} 
          placeholder="username"
        />
        <input
          type="text"
          className={styles.register__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={styles.register__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          className={styles.register__textBox}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <button className={styles.register__btn} onClick={register}>
          Register
        </button>

        <div>
          Already have an account? <Link href="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Register;