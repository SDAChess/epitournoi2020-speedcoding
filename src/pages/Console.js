import Terminal from "terminal-in-react";
import React from "react";
import CustomTerminal from "../components/CustomTerminal";
import Countdown from "react-countdown";

const timestamp = 1608372000000;

export default class Console extends React.Component {


    renderer = ({days, hours, minutes, seconds, completed}) => {
        if (completed) {
            console.log("Finished");
            return (<></>)
        } else
            return (
                <>
                    <h1>Pas encore l'heure!</h1>
                    <h2>Revenez dans :</h2>
                    <span>{days} jours, {hours} heures, {minutes} minutes et {seconds} secondes</span>
                </>
            );
    }

    render() {
        return (
            <div className="timer">
                <Countdown date={0} renderer={this.renderer}>
                    <CustomTerminal className="terminal"/>
                </Countdown>

            </div>
        );
    }
}