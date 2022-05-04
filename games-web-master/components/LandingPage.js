import styles from './LandingPage.module.css'

import GameCard from './GameCard';
import Footer from './Footer';
import {Container, Row, Col} from 'react-bootstrap';
import {useGameListHook} from '../hooks/game-list';
import {useSelector} from "react-redux";
import {userSelector} from "../store/userSlice";

const LandingPage = ({}) => {
    const [gameList] = useGameListHook();
    const {playedGames} = useSelector(
        userSelector
    );

    return (
        <Container>

            <Row className={styles.GameList}>
                <Col className={styles.Game_Card}>
                    {
                        gameList.map((a, i) =>
                            <GameCard
                                key={i}
                                name={a.name}
                                description={a.description}
                                image_url={a.image_url}
                                slug={a.slug}
                                is_playable={a.is_playable}
                                is_played={playedGames[a.slug]}
                                style={{listStyleType: "none"}}
                            />
                        )
                    }
                </Col>
            </Row>

            <Row>
                <Col className={styles.midbanner}><h1>Play Mobile Games for free Online and on the Go!</h1></Col>
            </Row>

        </Container>
    );
}

export default LandingPage;