import Navbar from 'react-bootstrap/Navbar'
import {Container, Nav} from 'react-bootstrap'
import {useSelector} from "react-redux";
import {userSelector} from "../store/userSlice";
import {useEffect} from "react";
import Link from 'next/link'

const Header = ({}) => {
    const {isLoggedIn} = useSelector(
        userSelector
    );

    useEffect(() => {
    }, [isLoggedIn]);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand style={{fontWeight: 'bold'}}><Link href="/" ><a className="navbar-brand">G A M E S  L O G O</a></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                    { isLoggedIn ? 
                            <Link href="/profile/me">
                                <a className="btn px-4 text-white login-header-btn float-right login-btn">
                                    Profile Anda
                                </a>
                            </Link> : 
                            <Link href="/register">
                                <a className="btn px-4 text-white login-header-btn float-right login-btn">
                                    Register
                                </a>
                            </Link>}
                    </Nav>
                    <span className="sr-only">()</span>
                    <Nav>
                    { isLoggedIn ? 
                            <Link href="/logout">
                                <a className="btn px-4 text-white login-header-btn float-right login-btn">
                                    Logout
                                </a>
                            </Link> : 
                            <Link href="/login">
                                <a className="btn px-4 text-white login-header-btn float-right login-btn">
                                    Login
                                </a>
                           </Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default Header;
