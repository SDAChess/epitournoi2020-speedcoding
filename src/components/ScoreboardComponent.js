import React from "react";
import ListItem from "./ListItem";

class ScoreboardComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: props.userList
        }
    }

    render() {
        return (
            <div className="scoreboard">
                Classement
                {this.state.userList.map((item, index) => {
                    return (
                        <ListItem data={{
                            userName: item.userName,
                            position: index + 1,
                            lastSubmit: item.validationTime,
                            total: item.exerciseCount,
                            nbcompleted: item.nbValidated
                        }}/>
                    );
                })}
            </div>
        );
    }
}

export default ScoreboardComponent
