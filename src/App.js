import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import firebase from "firebase/app"
import {BrowserRouter as Router, Route} from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import styles from "./App.css"
import {
    FirebaseAuthProvider,
} from "@react-firebase/auth";
import {HomePage} from "./pages/HomePage";
import Console from "./pages/Console";
import AppRoute from "./layout/AppRoute";
import DefaultLayout from "./layout/DefaultLayout";

function sign_in(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        });
}

class App extends Component {

    render() {
        return (
            <div className="application">
                <Helmet>
                    <style>{'body { background-color: #031E11;}'}</style>
                </Helmet>
                <div className="scanlines"/>
                <div className="glow"/>
                <Router>
                    <AppRoute exact path="/" component={HomePage} layout={DefaultLayout}/>
                    <AppRoute exact path="/play" component={Console} layout={DefaultLayout}/>
                </Router>
            </div>
        );
    }

}

export default App;