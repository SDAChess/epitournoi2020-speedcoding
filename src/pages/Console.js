import Terminal from "terminal-in-react";
import React from "react";
import CustomTerminal from "../components/CustomTerminal";
import Countdown from "react-countdown";

const timestamp = 1608372000000;

export default class Console extends React.Component {


    render() {
        return (
            <div className="timer">
                <h1 style={{fontSize: "0.93em"}}>Pas encore l'heure!</h1>
                <h2 style={{fontSize: "0.5em"}}>Revenez dans :</h2>
                <Countdown date={timestamp}>
                    <CustomTerminal/>
                </Countdown>
            </div>
        );
    }
}