import React from 'react';
import './App.css';
import Calendar from './Components/Calendar/index';
import NewEventForm from "./Components/NewEventForm";
import Event from "./Components/Event";

const style = {
    position: "relative",
    margin: "50px auto"
};

class App extends React.Component{

    onDayClick = (e, day) => {
        console.info(day);
    };

    render() {
        return (
            <div className="App">
              <Calendar style={style} width="302px"
                onDayClick={(e, day) => this.onDayClick(e, day)} />
                <NewEventForm/>
                <Event/>
            </div>
        );
    }

}

export default App;
