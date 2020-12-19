import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import {BrowserRouter as Router} from "react-router-dom";
import {
    FirebaseAuthProvider
} from "@react-firebase/auth";
import {
    FirestoreProvider
} from "@react-firebase/firestore";
// eslint-disable-next-line no-unused-vars
import styles from "./App.css"
import {HomePage} from "./pages/HomePage";
import Console from "./pages/Console";
import AppRoute from "./layout/AppRoute";
import DefaultLayout from "./layout/DefaultLayout";
import {firebaseConfig} from "./config/firebaseConfig"
import firebase from 'firebase'
import Scoreboard from "./pages/Scoreboard";

require('firebase/auth')

class App extends Component {

    render() {
        return (
            <div className="application">
                <Helmet>
                    <style>{'body { background-color: #031E11;}'}</style>
                </Helmet>
                <div className="scanlines"/>
                <div className="glow"/>
                <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
                    <FirestoreProvider {...firebaseConfig} firebase={firebase}>
                        <Router>
                            <AppRoute exact path="/" component={HomePage} layout={DefaultLayout}/>
                            <AppRoute exact path="/solve" component={Console} layout={DefaultLayout}/>
                            <AppRoute exact path="/scoreboard" component={Scoreboard} layout={DefaultLayout}/>
                        </Router>
                    </FirestoreProvider>
                </FirebaseAuthProvider>
            </div>
        );
    }

}

export default App;