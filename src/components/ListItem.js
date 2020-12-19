import React from "react"


class ListItem extends React.Component {

    constructor(props) {
        super(props);
        this.user = props.data.userName;
        this.nbcompleted = props.data.nbcompleted;
        this.position = props.data.position;
        this.finishTime = props.data.lastSubmit;
        this.total = props.data.total;
    }

    render() {
        return (
            <>
                <div className="list-item">
                    <div className="place-div">
                        {this.user}
                    </div>
                    <div className="scoreboard-left-div">
                        <div className="last-submission">
                            {`Finish time : ${
                                this.finishTime === 0 ? "TDB" :
                                    this.finishTime.getHours().toString() + "h" + this.finishTime.getMinutes().toString()}`
                            }
                        </div>
                        <div className="completed-div">
                            {this.nbcompleted + "/" + this.total}
                        </div>
                        <div className="position-div">
                            Rank : {this.position}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ListItem