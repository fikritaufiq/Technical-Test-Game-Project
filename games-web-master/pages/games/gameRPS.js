import { useEffect, useState } from 'react';
import { useSubmitGameScore } from '../../hooks/submit-game-score';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { auth } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from './GameRPS.module.css';
import Image from 'next/image'
import {
    rpsSelector, startGame, restartGame, nextRound, refreshGame, finishGame,
    setUserChoice, setComputerChoice, resultmatch,
    playerRockValue, playerPaperValue, playerScissorsValue, compRockValue, compPaperValue, compScissorsValue
} from '../../store/gameRpsSlice';
import { useDispatch, useSelector } from "react-redux";
import ReactAudioPlayer from 'react-audio-player';

const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}
const images = importAll(require.context('../../public/game', false, /\.(png|jpe?g|svg)$/));


const GameRPS = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const [player, loading, error] = useAuthState(auth);
    const choices = ['rock', 'paper', 'scissors']
    const [submitGameScore] = useSubmitGameScore();

    const { round, scores, result, resultTag, choosenRockTag,
        choosenPaperTag, choosenScissorsTag, choosenComputerRockTag, choosenComputerPaperTag,
        choosenComputerScissorsTag, status, disableChoice, disableNext,
        gameStart, done, gameFinish } = useSelector(rpsSelector);

    const start = () => {
        dispatch(startGame());

    }

    const restart = () => {
        dispatch(restartGame());
    }

    const next = (user, computer, res) => {
        dispatch(nextRound({ user, computer, res }));
        restart();
    }

    const refresh = (user, computer, res) => {
        restart();
        dispatch(refreshGame({ user, computer, res }));
    }

    const handleClick = (value) => {
        if (round === 5) {
            dispatch(finishGame());
            submitGameScore('gameRPS', scores);
        }
        if (value === 'rock') {
            dispatch(playerRockValue());
        } else if (value === 'paper') {
            dispatch(playerPaperValue());
        } else if (value === 'scissors') {
            dispatch(playerScissorsValue());
        }
        dispatch(setUserChoice({ value }));
        GenerateComputerChoice();
        dispatch(resultmatch());

    }

    const GenerateComputerChoice = () => {
        const randomChoice = choices[Math.floor(Math.random() * choices.length)]

        if (randomChoice === 'rock') {
            dispatch(compRockValue());
        } else if (randomChoice === 'paper') {
            dispatch(compPaperValue());
        } else {
            dispatch(compScissorsValue());
        }
        dispatch(setComputerChoice({ randomChoice }));
    }

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!player) {
            alert('Please Login First');
            return (
                router.push('/login')
            )
        }

    }, [player, loading])


    return (
        <>
            <div className={styles.wrapperRps}>
                <div className={styles.headerRps}>
                    <div className={styles.backbutton}>
                        <Link href="/">
                            <div className={styles.backbuttonImage}>
                                <Image
                                    src={images['backbutton.png']}
                                    alt='backgroundImages' />
                            </div>
                        </Link>
                    </div>
                    <div className={styles.logoRps}>
                        <div className={styles.logoRpsImg}>
                            <Image src={images['rps.png']} alt='logoImages' />
                        </div>
                    </div>
                    <div className={styles.titleRps}>ROCK PAPER SCISSORS</div>
                    <div style={{fontSize:'2.2rem' ,fontWeight: "400"}}>Music : </div>
                    <div><ReactAudioPlayer style={{color: "#bd0000", fontWeight: "700"}} src='../music/harvestmoon.mp4' autoPlay controls loop /></div>
                </div>
                <div className={styles.gameStatus}>{gameStart ?
                    <h1 style={{ color: "#bd0000", textAlign: "center", fontWeight: "700" }}>Game On, <br /> Pick Your
                        Choice !</h1> : <button className={styles.startBtn} onClick={() => start()}>START GAME</button>}<br /><br />
                </div>
                {status ? <div className={styles.gameStatus}>
                    <h2>Round of 5 : Turn {round}</h2>
                    <h1>Score : {scores} </h1> <br />
                </div> : ''}
                <div className={styles.contentRps}>
                    <div className={styles.playerCom}>
                        <p>PLAYER</p>
                        <p></p>
                        <p></p>
                        <p>COMPUTER</p>
                    </div>
                    <div className={styles.choices}>
                        <div className={styles.choiceLeft}>
                            <div id="player-rock"
                                className={`${styles.choice} ${disableChoice ? styles.disabled : ""} ${choosenRockTag ? styles.choiceMarker : ""}`}
                                tabIndex="1">
                                <div className={styles.choiceImage}>
                                    <Image src={images['rock.png']} onClick={() => handleClick('rock')}
                                        alt='rockImages' /></div>
                            </div>
                            <div id="player-paper"
                                className={`${styles.choice} ${disableChoice ? styles.disabled : ""} ${choosenPaperTag ? styles.choiceMarker : ""}`}
                                tabIndex="1">
                                <div className={styles.choiceImage}>
                                    <Image src={images['paper.png']}
                                        onClick={() => handleClick('paper')}
                                        alt='paperImages' /></div>
                            </div>
                            <div id="player-scissors"
                                className={`${styles.choice} ${disableChoice ? styles.disabled : ""} ${choosenScissorsTag ? styles.choiceMarker : ""}`}
                                tabIndex="1">
                                <div className={styles.choiceImage}>
                                    <Image src={images['scissors.png']}
                                        onClick={() => handleClick('scissors')} alt='scissorsImages' />
                                </div>
                            </div>
                        </div>
                        <div className={styles.resultMiddle}>
                            <div></div>
                            <div className={resultTag ? styles.resultRpsChange : styles.resultRpsChange}>{result}</div>
                            {gameFinish ? <h1>Game Finished <br /> Your Score is {scores}</h1> : ''}
                            {done ? <div className={styles.refreshRps}>
                                <div className={styles.refreshRpsImg}>
                                    <Image src={images['refresh.png']}
                                        onClick={() => refresh(null, null, 'VS')}
                                        alt='refreshImages' />
                                </div>
                            </div> :
                                <div className={`${styles.refreshRps} ${disableNext ? styles.hide : ""} `}>
                                    <div className={styles.refreshRpsImg}>
                                        <Image
                                            src={images['next.png']} onClick={() => next(null, null, 'VS')}
                                            alt='nextImages' />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={styles.choiceRight}>
                            <div id="com-rock"
                                className={`${styles.choice} ${choosenComputerRockTag ? styles.choiceMarker : ""}`}>
                                <div className={styles.choiceImage}>
                                    <Image className={styles.choiceImage} src={images['rock.png']} alt='rockImages' />
                                </div>
                            </div>
                            <div id="com-paper"
                                className={`${styles.choice} ${choosenComputerPaperTag ? styles.choiceMarker : ""}`}>
                                <div className={styles.choiceImage}>
                                    <Image className={styles.choiceImage} src={images['paper.png']} alt='paperImages' />
                                </div>
                            </div>
                            <div id="com-scissors"
                                className={`${styles.choice} ${choosenComputerScissorsTag ? styles.choiceMarker : ""}`}>
                                <div className={styles.choiceImage}>
                                    <Image className={styles.choiceImage} src={images['scissors.png']}
                                        alt='scissorsImages' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GameRPS;