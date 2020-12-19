import React from "react"
import {FirestoreCollection} from "@react-firebase/firestore";
import {ScoreboardHandler} from "../components/ScoreboardHandler";


class Scoreboard extends React.Component {

    render() {
        return (
            <FirestoreCollection path={"users/"}>
                {data => {
                    if (data.isLoading) {
                        return (
                            <h1>Loading...</h1>
                        )
                    } else {
                        return (<ScoreboardHandler userList={data.ids}/>)
                    }
                }}
            </FirestoreCollection>
        )
    }
}

export default Scoreboard