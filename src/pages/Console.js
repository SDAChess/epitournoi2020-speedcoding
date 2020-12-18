import React from "react";
import CustomTerminal from "../components/CustomTerminal";
import Countdown from "react-countdown";
import firebase from "firebase";
import {FirebaseAuthConsumer} from "@react-firebase/auth";
import {FirestoreCollection} from "@react-firebase/firestore";

require('firebase/auth')

//const timestamp = 1608372000000;
const timestamp = 1608252300000;
const endTimeStamp = 1608252600000;

export default class Console extends React.Component {

    fetchUser() {
        if (firebase.auth().currentUser) {
            const db = firebase.firestore();
            db.collection("users")
                .doc(firebase.auth().currentUser.email).get()
                .then((doc) => {
                        this.userName = doc.data().userName
                    }
                );
        }
    }

    renderer = ({days, hours, minutes, seconds, completed}) => {
        if (completed) {
            return (<></>)
        } else
            return (
                <>
                    <h2>Pas encore l'heure!</h2>
                    <h3>Revenez dans :</h3>
                    <span>{days} jours, {hours} heures, {minutes} minutes et {seconds} secondes</span>
                </>
            );
    }


    consoleRenderer = ({days, hours, minutes, seconds, completed}) => {
        if (completed) {
            return (<>
                <h2>L'épreuve est terminée !</h2>
                <h3>Merci d'avoir participé</h3>
            </>)
        } else {
            return (
                <FirebaseAuthConsumer>
                    {({isSignedIn}) => {
                        if (isSignedIn === true && firebase.auth().currentUser.email) {
                            return (
                                <FirestoreCollection path={"users/"}>
                                    {data => {
                                        if (data.isLoading)
                                            return (<h2>Loading...</h2>);
                                        else {
                                            let index = 0
                                            for (let i = 0; i < data.value.length; i++)
                                                if (data.ids[i] === firebase.auth().currentUser.email) {
                                                    index = i;
                                                    break;
                                                }
                                            return (
                                                <CustomTerminal className="terminal"
                                                                userName={data.value[index].userName}/>
                                            );
                                        }
                                    }}
                                </FirestoreCollection>)
                        } else {
                            return (
                                <CustomTerminal className="terminal" userName="guest"/>
                            );
                        }
                    }}
                </FirebaseAuthConsumer>
            );
        }
    }

    render() {
        return (
            <div className="timer">
                <Countdown date={timestamp} renderer={this.renderer}>
                    <Countdown date={endTimeStamp} renderer={this.consoleRenderer}/>
                </Countdown>
            </div>
        );
    }
}