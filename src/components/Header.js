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
                            <a>Page d'accueil</a>
                        </Link>
                        <Link to="/play" className="link">
                            <a>Scoreboard</a>
                        </Link>
                        <Link to="/play" className="link">
                            <a>Commencer !</a>
                        </Link>
                    </div>
                </div>
            </>
        );
    }
}