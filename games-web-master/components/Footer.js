import {Container, Card, Row, Col} from 'react-bootstrap'
import styles from './LandingPage.module.css'
import Image from 'next/image'

const importAll = (r) => {
    let images = {};
    r.keys().map((item,index) => {images[item.replace('./','')] = r(item);});
    return images;
}
const images = importAll(require.context('../public/icon', false, /\.(png|jpe?g|svg)$/));

const Footer = ({}) => {
    return (
     
    <Container>
        <Row>
            <Col md={4}></Col>
            <Col className={styles.bottomicon}><Image src={images['icon1.png']} className={styles.iconSize}/></Col>
            <Col className={styles.bottomicon}><Image src={images['icon2.png']} className={styles.iconSize}/></Col>
            <Col className={styles.bottomicon}><Image src={images['icon3.png']} className={styles.iconSize}/></Col>
            <Col className={styles.bottomicon}><Image src={images['icon4.png']} className={styles.iconSize}/></Col>
            <Col md={4}></Col>
        </Row>

        <Row>
            <Col className={styles.bottombanner}>
            <h6>© 2022 Your Games, Inc. All Right Reserved | PRIVACY POLICY | TERMS OF SERVICES | CODE OF CONDUCT |</h6>
            </Col>
                
        </Row>

    </Container>
    );
}


export default Footer;
