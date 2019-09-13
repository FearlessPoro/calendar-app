import React from "react";


export default class Event extends React.Component{
    state = {
        time: ["16:00", "12:00"],
        title: ["pyszne", "boogie"],
        info: ["amam", "oogie"]
    };

    constructor(props) {
        super(props);
        // this.setState({
        //     time: props.time,
        //     title: props.title,
        //     info: props.info
        // })
    }

    Divs = () => {
        let boxes = [];
        for (let i=0; i<this.state.time.length; i++) {
            boxes.push(
                <div className="event-box" key={i}>
                    <table className="events">
                        <thead>
                        <tr>
                            <td>{this.state.time[i]}</td>
                            <td>{this.state.title[i]}</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Info:</td>
                            <td>{this.state.info[i]}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            )
        }
        return boxes;
    };

    render() {
        return (
            <this.Divs/>
        );
    }

}