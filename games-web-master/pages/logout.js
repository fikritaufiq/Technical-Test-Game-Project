import React, {useEffect} from "react";
import './Login.module.css'
import {logoutUser, userSelector} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";

const Logout = () => {
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector(
        userSelector
    );

    useEffect(() => {
        console.log("LOGOUT PAGE")
        dispatch(logoutUser())
    }, []);

    return (
        <div>
            Log Out Success
        </div>
    );
}

export default Logout;