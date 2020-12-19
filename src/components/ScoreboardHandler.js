import React from "react";
import firebase from "firebase";
import ScoreboardComponent from "./ScoreboardComponent";
import '@firebase/firestore'

require('firebase/auth')
require('firebase/firestore')
require('firebase');

export class ScoreboardHandler extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            userList: props.userList,
            isDataHandled: false
        }
    }

    componentDidMount() {
        this.getUserStatuses(this.state.userList).then((userDataList) => this.sortValues(userDataList))
    }

    async getUserStatuses(userList) {
        return await Promise.all(userList.map(async (email) => {
                const validationData = {};
                const db = firebase.firestore();
                const subjects = await db.collection("subjects").get();
                validationData.exerciseCount = subjects.docs.map(doc => doc.data()).length
                const exercises = await db.collection("users")
                    .doc(email)
                    .collection("exercices")
                    .get()
                validationData.userName = (await db.collection("users").doc(email).get()).data().userName;
                console.log(validationData.userName)
                validationData.nbValidated = 0;
                validationData.lastSubmit = 0;
                validationData.validated = exercises.docs.map((doc) => {
                    if (doc.data().isValidated) {
                        validationData.nbValidated += 1;
                        return true;
                    }
                    return false;
                });
                const finishTimes = exercises.docs.map((doc) => {
                    return (doc.data().validatedAt.toDate())
                })
                if(validationData.nbValidated === validationData.exerciseCount) {
                    validationData.validationTime = Math.max.apply(Math, finishTimes);
                } else {
                    validationData.validationTime = 0;
                }
                return validationData;
            }
        ))
    }

    sortValues(userDataList) {
        this.setState({
            userValidationData: userDataList,
            isDataHandled: true
        })
    }


    render() {
        if (this.state.isDataHandled) {
            return (<ScoreboardComponent userList={this.state.userValidationData}/>
            );
        } else {
            return (<h1>Loading...</h1>)
        }
    }

}