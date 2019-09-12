import React from 'react';
import './App.css';
import Calendar from './Components/Calendar/index';

const style = {
    position: "relative",
    margin: "50px auto"
};

class App extends React.Component{

    onDayClick = (e, day) => {
        alert(day);
        console.info(day);
    };

    render() {
        return (
            <div className="App">
              <Calendar style={style} width="302px"
                onDayClick={(e, day) => this.onDayClick(e, day)} />
            </div>
        );
    }

}

export default App;
