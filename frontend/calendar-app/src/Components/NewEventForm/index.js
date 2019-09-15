import React from 'react';
import "./event.css";

export default class NewEventForm extends React.Component{
    state = {
        sendData: false
    };

    sendData = (event) => {
        const data = new FormData(event.target);
        data.set('timestamp', this.props.selectedDay.format('YYYY-MM-DD') + " " + data.get('timestamp')+ ":00");
        console.info(data.get('timestamp') );
        fetch('http://localhost:8080/SaveEvent', {
            method: 'POST',
            body: data
        });
        window.location.reload();
    };

    render() {
        return(
          <div className="new-event-box">
              <h1>Create new event on selected date:</h1>
              <form className="form-group" onSubmit={this.sendData}>
                  <label>
                      Time: <br/><input type="time" name="timestamp" className="time" required/>
                  </label>
                  <label>
                      Title:<br/> <input type="text" name="title"/>
                  </label>
                  <label>
                      Info: <br/><input className="text-info" type="text-area" name="info"/>
                  </label>
                  <input type="submit" value="Create" className="button"/>
              </form>
          </div>
        );
    }


}