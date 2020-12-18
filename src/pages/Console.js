import React from "react";
import CustomTerminal from "../components/CustomTerminal";
import Countdown from "react-countdown";
import firebase from "firebase";
import {FirebaseAuthConsumer} from "@react-firebase/auth";
import {FirestoreCollection, FirestoreDocument} from "@react-firebase/firestore";

require('firebase/auth')

//const timestamp = 1608372000000;
const timestamp = 0;

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
                <Countdown date={timestamp} renderer={this.renderer}>
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
                </Countdown>
            </div>
        );
    }
}