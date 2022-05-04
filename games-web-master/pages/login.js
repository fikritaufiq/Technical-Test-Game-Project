import React, {useEffect, useState} from "react";
import Link from 'next/link'
import styles from './Login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {loginUser, clearState, userSelector, storeUserProfile} from "../store/userSlice";
import {useRouter} from "next/router";

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {isLoggedIn, isSuccess, isError, errorMessage, isLoading} = useSelector(
        userSelector
    );
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingButton, setLoadingButton] = useState(false);

    useEffect(() => {
        if (isLoading) {
            //muter2
            setLoadingButton(true);
        } else {
            setLoadingButton(false);
        }   
    }, [isLoading]);

    useEffect(() => {
        if (isError) {
            alert(errorMessage)
            dispatch(clearState())
        }
    }, [isError]);

    useEffect(() => {

        if (isLoggedIn) {
            dispatch(storeUserProfile())
            return router.push("/dashboard")
        }
    }, [isLoggedIn]);


    const signIn = (e) => {
        e.preventDefault()
        dispatch(loginUser({email, password}));
    };

    return (
        <div className={styles.login}>
            <div className={styles.login__container}>
                <input
                    type="text"
                    className={styles.login__textBox}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className={styles.login__textBox}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />

                {isLoading ? 
                <button 
                    className={styles.login__button} 
                    disabled>Loading...</button> : ''}

                <button
                    type="button"
                    className={styles.login__btn}
                    onClick={(e) => signIn(e)}
                    // isLoading={isLoading}
                >
                    Login
                </button>
                <div>
                    <Link href="/reset">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link href="/register">Register</Link> now.
                </div>
            </div>
        </div>
    );
}

export default Login;