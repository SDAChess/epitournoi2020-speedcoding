import React from "react"
import Terminal from "terminal-in-react";
import firebase from 'firebase'
import pseudoFileSystemPlugin from 'terminal-in-react-pseudo-file-system-plugin';
import ReactHtmlParser from 'react-html-parser';
import {withRouter} from "react-router-dom";
import {IOPlugin} from "../Plugins/IOPlugin";
import '@firebase/firestore'

require('firebase/auth')
require('firebase/firestore')
require('firebase');

const PseudoFileSystem = pseudoFileSystemPlugin("/");


class CustomTerminal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: props.userName === undefined ? "guest" : props.userName
        }
        this.ioplugin = undefined;
    }

    signIn(email, password, print) {
        this.ioplugin.flush();
        firebase.auth().signInWithEmailAndPassword(email, password).then(r => {
            this.fetchExercises(email);
        }).catch(reason => {
            console.log(reason)
            switch (reason.code) {
                case "auth/user-not-found":
                    print(<p style={{color: "red"}}>Email invalide</p>)
                    break;
                case "auth/wrong-password":
                    print(<p style={{color: "red"}}>Mot de passe invalide</p>)
                    break;
            }
        });
    }

    stringTemplateParser(expression, objList) {
        const templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
        let text = expression.replace(templateMatcher, (substring, value, index) => {
            value = objList[value];
            return value;
        });
        return text
    }

    getExerciseSubmitTimes(exercises) {
        return exercises.docs.map((doc) => {
            const minuteDiff = (Date.now() - doc.data().lastAttempt.toDate()) / 60000;
            console.log(minuteDiff)
            if (0 <= doc.data().attempts && doc.data().attempts <= 3) {
                if (minuteDiff > 1)
                    return 0
                else
                    return (1 - minuteDiff) * 60;
            } else if (4 <= doc.data().attempts && doc.data().attempts <= 6) {
                if (minuteDiff > 5)
                    return 0
                else
                    return (5 - minuteDiff) * 60;
            } else {
                if (minuteDiff > 10)
                    return 0
                else
                    return (10 - minuteDiff) * 60;
            }
        });
    }

    async submit(pbnumber, flag, print) {
        const db = firebase.firestore();
        const exercises = await db.collection("users")
            .doc(firebase.auth().currentUser.email)
            .collection("exercices")
            .get()
        const validatedExerices = exercises.docs.map((doc) => {
            return doc.data().isValidated
        });
        const delays = this.getExerciseSubmitTimes(exercises);
        const isValidated = validatedExerices[pbnumber - 1];
        if (delays === undefined || isValidated === undefined) {
            print("Ce numéro ne correpond à aucun problème.")
            return;
        }
        const timeToSubmit = delays[pbnumber - 1];
        if (isValidated) {
            print("Vous avez déjà validé ce problème!")
        } else {
            if (timeToSubmit === 0) {
                if (flag === exercises.docs[pbnumber - 1].data().correctValue) {
                    print("Vous avez validé le problème ! Félicitations !")
                    await db.collection("users")
                        .doc(firebase.auth().currentUser.email)
                        .collection("exercices")
                        .doc((pbnumber - 1).toString()).update({
                            isValidated: true,
                            validatedAt: firebase.firestore.Timestamp.now()
                        });
                } else {
                    print("Oups, ce n'est pas tout à fait ça, réesayez !")
                    await db.collection("users")
                        .doc(firebase.auth().currentUser.email)
                        .collection("exercices")
                        .doc((pbnumber - 1).toString()).update({
                            lastAttempt: firebase.firestore.Timestamp.now(),
                            attempts: exercises.docs[pbnumber - 1].data().attempts + 1
                        });
                }
            } else {
                print("Trop d'essais sur cet exercice ! Vous devez encore attendre " + Math.round(timeToSubmit) + " secondes avant" +
                    " de pouvoir réésayer cet exercice.")
            }

        }
    }

    async getExerciseCompletionData() {
        const validationData = {};
        const db = firebase.firestore();
        const subjects = await db.collection("subjects").get();
        validationData.exerciseCount = subjects.docs.map(doc => doc.data()).length
        const exercises = await db.collection("users")
            .doc(firebase.auth().currentUser.email)
            .collection("exercices")
            .get()
        validationData.nbValidated = 0;
        validationData.validated = exercises.docs.map((doc) => {
            if (doc.data().isValidated) {
                validationData.nbValidated += 1;
                return true;
            }
            return false;
        });
        validationData.exerciseDelay = this.getExerciseSubmitTimes(exercises);
        return validationData;
    }

    async fetchExercises(email) {
        const db = firebase.firestore();
        const exercises = await db.collection("subjects").get();
        const exerciseList = exercises.docs.map(doc => doc.data());
        const inputs =
            await db.collection("users")
                .doc(email)
                .collection("exercices").get();
        for (let i = 0; i < exerciseList.length; i++) {
            const parsedText = this.stringTemplateParser(
                exerciseList[i].subject, inputs.docs[i].data().dataInputs);
            this.ioplugin.writeFileToDB("problem" + (i + 1), parsedText);
        }
    }


    render() {
        return (
            <Terminal
                color={"#00FF00"}
                backgroundColor='black'
                barColor='black'
                outputColor={"#FFFFFF"}
                plugins={[
                    PseudoFileSystem,
                    {
                        class: IOPlugin,
                        config: {
                            filesystem: PseudoFileSystem.displayName,
                            callback: (plg) => {
                                this.ioplugin = plg;
                            }
                        }
                    }
                ]}
                startState={"maximised"}
                prompt={"#00FF00"}
                hideTopBar={true}
                allowTabs={false}
                promptSymbol={
                    this.state.userName + "@epitournoi >"
                }
                style={{fontSize: "0.5em"}}
                commands={{
                    'login': (args, print, runCommand) => {
                        if (args[1] && args[2]) {
                            this.signIn(args[1], args[2], print)
                        } else {
                            print(<span
                                style={{color: "red"}}><b>Syntax Error</b> : usage sign-in email password</span>);
                        }
                    },
                    'open': (args, print, _) => {
                        if (args[1]) {
                            const list = this.ioplugin.readFile(args[1]).split("\\n")
                            let str = "";
                            for (let i = 0; i < list.length; i++)
                                str += list[i] + "<br/>"
                            print(
                                <div className="displaySubject">
                                    {ReactHtmlParser(str)}
                                </div>
                            );
                        } else {
                            print(<div>
                                Not bold then <b>Error!</b> then not bold.
                            </div>);
                        }
                    },
                    'pull': (args, print) => {
                        if (firebase.auth().currentUser) {
                            print(<b>Downloading exercises...</b>);
                            this.fetchExercises(firebase.auth().currentUser.email).then(
                                print(<span
                                    style={{color: "green"}}>
                                    <b>Done !</b> You can open the files using the <b>open</b> command</span>))
                        }
                    },
                    'logout': (args, print) => {
                        if (firebase.auth().currentUser) {
                            firebase.auth().signOut().then()
                            this.props.history.push("/")
                        } else {
                            print("Vous n'êtes pas connecté.")
                        }
                    },
                    'status': (args, print) => {
                        if (firebase.auth().currentUser) {
                            const minutes = new Date(1608375600000) - Date.now();
                            print(`Il vous reste ${Math.round(minutes / 1000 / 60)} minutes avant la fin de l'épreuve.`)
                            print(`Récupération des données de l'épreuve...`)
                            this.getExerciseCompletionData().then((validationData) => {
                                print(`Vous avez terminé ${validationData.nbValidated}/${validationData.exerciseCount} problèmes.`)
                                for (let i = 0; i < validationData.exerciseCount; i++) {
                                    print(<b style={{color: "green"}}>{"Problème " + (i + 1)}</b>);
                                    if (validationData.validated[i])
                                        print(<b style={{color: "green"}}> Validé</b>)
                                    else
                                        print(<b style={{color: "red"}}> Non validé</b>)
                                    if (validationData.exerciseDelay[i])
                                        print(`  Il faudra encore attendre ${Math.round(validationData.exerciseDelay[i])} secondes ` +
                                            "avant de pouvoir soumettre une nouvelle réponse au problème " + (i + 1))
                                    else
                                        print("  Vous pouvez soumettre une réponse au problème " + (i + 1))
                                }
                            })
                        } else {
                            print("Vous n'êtes pas connecté.")
                        }
                    },
                    'submit': (args, print) => {
                        this.submit(args[1], args[2], print).then();
                    }
                }}
                descriptions={{
                    'open-google': 'opens google.com',
                    alert: 'alert', popup: 'alert',
                    'display': "Shows the content of a file.",
                }}
                msg='Bienvenue au Speed Coding EPITA, lisez le fichier README pour en savoir plus!'
            />
        )
    }

}

export default withRouter(CustomTerminal)