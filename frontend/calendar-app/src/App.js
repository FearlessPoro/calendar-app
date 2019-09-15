import React from 'react';
import './App.css';
import Calendar from './Components/Calendar/index';
import NewEventForm from "./Components/NewEventForm";
import Event from "./Components/Event";
import moment from "moment";

const style = {
    position: "relative",
    margin: "50px auto"
};

class App extends React.Component{

    state = {
        selectedDay: moment()
    };

    onDayClick = (e, day) => {
        this.setState({
            selectedDay: day
        })
    };

    render() {
        return (
            <div className="App">
              <Calendar style={style} width="302px"
                onDayClick={(e, day) => this.onDayClick(e, day)} />
                <NewEventForm selectedDay={this.state.selectedDay}/>
                <Event selectedDay={this.state.selectedDay}/>
            </div>
        );
    }

}

export default App;
