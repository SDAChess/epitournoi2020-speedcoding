import React from "react"
import {Link} from "react-router-dom"

export default class Header extends React.Component {
    render() {
        return (
            <>
                <div className="header-upper-div">
                    <div className="header-left-div">
                        <h1>Speed Coding</h1>
                    </div>
                    <div className="header-right">
                        <Link to="/" className="link">
                            <span>Page d'accueil</span>
                        </Link>
                        <Link to="/scoreboard" className="link">
                            <span>Scoreboard</span>
                        </Link>
                        <Link to="/solve" className="link">
                            <span>Commencer !</span>
                        </Link>
                    </div>
                </div>
            </>
        );
    }
}