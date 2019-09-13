import React from 'react';
import "./event.css";

export default class NewEventForm extends React.Component{
    state = {
        timestamp: null,
        text: null
    };

    constructor(props) {
        super(props);

    }

    render() {
        return(
          <div className="event-box">
              <form>
                  <label>
                      Time: <input type="text" name="time"/>
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