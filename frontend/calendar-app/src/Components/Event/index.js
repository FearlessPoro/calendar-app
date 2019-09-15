import React from "react";
import "./events.css"

export default class Event extends React.Component{
    state = {
        selectedDayChange: false,
        time: [],
        title: [],
        info: []
    };

    Divs = () => {
        let boxes = [];
        this.fetchData();

        for (let i=0; i<this.state.time.length; i++) {

            boxes.push(
                <div className="event-box" key={i}>
                    <table className="event-table">
                        <thead>
                        <tr>
                            <td>{this.state.time[i]}</td>
                            <td className="title">{this.state.title[i]}</td>
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


    fetchData() {
        fetch('http://localhost:8080/EventsOn/' + this.props.selectedDay.format('YYYY-MM-DD')).then(
            results => {
                return results.json();
            }
        ).then(data => {
            let times = [];
            let titles = [];
            let infos = [];
            for (let i = 0; i < data.length; i++) {
                const time = new Date(data[i].timestamp).toLocaleTimeString();
                times.push(time);
                titles.push(data[0].title);
                infos.push(data[0].info);
            }
            this.setState({
                time: times,
                title: titles,
                info: infos
            });
        });
    }

    render() {
        return (
            <this.Divs/>
        );
    }

}