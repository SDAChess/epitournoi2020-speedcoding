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
                validationData.finishTimes = finishTimes;
                if (validationData.nbValidated === validationData.exerciseCount) {
                    validationData.validationTime = Math.max.apply(Math, finishTimes);
                } else if (Date.now() > new Date(1608375600000)) {
                    validationData.validationTime = new Date(1608375600000);
                } else {
                    validationData.validationTime = 0;
                }
                return validationData;
            }
        ))
    }

    sortValues(userDataList) {
        this.setState({
            userValidationData: userDataList.sort((a, b) => this.sort(a, b)),
            isDataHandled: true
        })
    }

    sort(userDataA, userDataB) {
        if (userDataA.nbValidated === userDataB.exerciseCount && userDataB.nbValidated === userDataB.exerciseCount) {
            return userDataA.validationTime.getTime() - userDataB.validationTime.getTime();
        } else {
            if (userDataA.nbValidated < userDataB.nbValidated)
                return 1
            else if (userDataA.nbValidated > userDataB.nbValidated)
                return -1
            else
                for (let i = userDataA.finishTimes.length - 1; i >= 0; i--) {
                    if ((userDataA.finishTimes[i]).getTime() - (userDataB.finishTimes[i]).getTime() !== 0) {
                        if (i === 2 || i === 1) {
                            const p1Ta = (userDataA.finishTimes[1]).getTime();
                            const p1Tb = (userDataB.finishTimes[1]).getTime();
                            const p2Ta = (userDataA.finishTimes[2]).getTime();
                            const p2Tb = (userDataB.finishTimes[2]).getTime();
                            const mini = Math.min(p1Ta, p1Tb, p2Ta, p2Tb);
                            if(mini === 1608256800000)
                                return 0;
                            if (mini === p1Ta || mini === p2Ta)
                                return -1
                            if (mini === p1Tb || mini === p2Tb)
                                return 1
                        }
                        return (userDataA.finishTimes[i]).getTime() - (userDataB.finishTimes[i]).getTime()
                    }
                }

        }
        return 0;
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