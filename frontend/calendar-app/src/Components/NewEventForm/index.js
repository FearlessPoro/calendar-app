import React from 'react';
import "./event.css";

export default class NewEventForm extends React.Component{
    state = {
        timestamp: null,
        text: null
    };


    render() {
        return(
          <div className="event-box">
              <h3>Create new event:</h3>
              <form>
                  <label>
                      Time: <input type="time" name="time" required/>
                  </label>
                  <label>
                      Title: <input type="text" name="title"/>
                  </label>
                  <label>
                      Info: <input type="text" name="info"/>
                  </label>
                  <input type="submit" value="Save"/>
              </form>
          </div>
        );
    }


}