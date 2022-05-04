import React from "react";
import styles from './gameSnake.module.css'


export default (props) => {
    return (
        <div>
            {props.snakeDots.map((dot,i) => {
                const style = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`,
                }
                return (
                    <div className={styles.snakeDot} key={i} style={style}></div>
                )
            })}
        </div>
    )
}