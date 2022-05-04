import {db, fetchCurrentUser} from '../services/firebase'


export const useSubmitGameScore = () => {

    const submitGameScore = async (game_id, score) => {
        let user = await fetchCurrentUser()
        await db.collection('user_game_histories').add({
            game_id,
            score,
            user_id: user.uid,
            created_at: new Date(),
        })

        await db.collection("users").doc(user.uid).set({
            "played_games": {
                [game_id] : {}
            }
        }, {merge: true});
    }
    return [submitGameScore]
}