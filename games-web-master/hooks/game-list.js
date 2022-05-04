import {db} from '../services/firebase'
import {useEffect, useState} from "react";
import { query, orderBy, limit, collection, doc, getDocs } from "firebase/firestore";


export const useGameListHook = () => {
    const [gameList, setGameList] = useState([])

    useEffect( async () => {
        const q = query(collection(db, "games"), orderBy("name"), limit(10));
        const querySnapshot = await getDocs(q);
        let data = []
        await querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        setGameList(data)

    }, []);

    return [gameList]
}
