import React from 'react';
import moment from 'moment';
import './calendar.css';

export default class Calendar extends React.Component {
    state = {
        dateObject: moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false,
        selectedDay: moment()
    };

    constructor (props) {
        super(props);
        this.width = props.width || "350px";
        this.style = props.style || {};
    }


    // TODO: Below should probably be a separate component
    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("month", monthNo);
        this.setState({
            dateObject: dateObject
        })
    };

    onSelectChange = (e, data) => {
        this.setMonth(data);
        this.props.onMonthChange && this.props.onMonthChange();
    };

    SelectList = (props) => {
        let popup = props.data.map ( (data) => {
            return (
                <div key={data}>
                    <a href="#" onClick={(e) => {this.onSelectChange(e, data)} }>
                        {data}
                    </a>
                </div>
            );
        });
        return (
            <div className="month-popup">
                {popup}
            </div>
        )
    };

    MonthNav = () => {
     return (
         <span className="label-month"
               onClick={(month) => {this.toggleMonthPopup(month) }}>
             {this.month()}
             {this.state.showMonthPopup &&
             <this.SelectList data={this.months}/>
             }
         </span>
     );
    };

    // <- up to here
    //TODO: another one here
    YearNav = () => {
        return(
            this.state.showYearPopup ?
                <input
                    defaultValue={this.year()}
                    className="editor-year"
                    ref={(yearInput => {this.yearInput = yearInput})}
                    onKeyUp= {(e) => this.onKeyUpYear(e) }
                    onChange = {(e) => this.onYearChange(e) }
                    type="number"
                    placeholder="year"
                />
            :
            <span className="label-year"
                   onDoubleClick={() => {this.showYearEditor()}}>
                {this.year()}
            </span>

        );
    };

    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.setYear(e.target.value);
            this.setState({
                showYearPopup: false
            });
        }
    };

    onYearChange = (e) => {
        this.setYear(e.target.value);
        this.props.onYearChange && this.props.onYearChange(e, e.target.value);
    };

    setYear = (year) => {
      let dateObject = Object.assign({}, this.state.dateObject);
      dateObject = moment(dateObject).set("year", year);
      this.setState({
          dateObject: dateObject
      })
    };

    showYearEditor = () => {
        this.setState({
            showYearPopup: true
        });
    };

    nextMonth = () => {
      let dateObject = Object.assign({}, this.state.dateObject);
      dateObject = moment(dateObject).subtract(1, "month");
      this.setState({
          dateObject: dateObject
      });
      this.props.onNextMonth && this.props.onNextMonth();
    };

    prevMonth = () => {
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).add(1, "month");
        this.setState({
            dateObject: dateObject
        });
        this.props.onPrevMonth && this.props.onPrevMonth();
    };

    render() {
        const weekdaysHeader = this.createWeekdaysHeader();
        const blanks = this.createBlanks();
        const daysInMonth = this.createDaysInMonth();


        const totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length -1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

            let trElems = rows.map((d, i) => {
                return (
                  <tr key={i*100}>
                      {d}
                  </tr>
                );
            });

        return (
            <div className="calendar-container">
                <table className="calendar">
                    <thead>
                        <tr className="calendar-header">
                            <td colSpan="5">
                                <this.MonthNav/>
                                {" "}
                                <this.YearNav/>
                            </td>
                            <td colSpan="2" className="nav-month">
                                <i className="prev fa fa-fw fa-chevron-left"
                                onClick={ () => {this.nextMonth()}}>
                                </i>
                                <i className="prev fa fa-fw fa-chevron-right"
                                    onClick={() => {this.prevMonth()}}>
                                </i>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {weekdaysHeader}
                        </tr>
                        {trElems}
                    </tbody>
                </table>
            </div>
        );

    }

    toggleMonthPopup = () => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup
        })
    };

    weekdaysShort = moment.weekdaysShort();
    months = moment.months();

    year = () => {
        return this.state.dateObject.format("Y");
    };
    month = () => {
        return this.state.dateObject.format("MMMM");
    };
    daysInMonth = () => {
        return this.state.dateObject.daysInMonth();
    };

    currentDay = () => {
        return this.state.dateObject.format("D");
    };

    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject;
        return moment(dateObject)
            .startOf("month")
            .format("d");
    };

    createBlanks() {
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td className="emptySlot" key={i*10}>
                    {""}
                </td>
            );
        }
        return blanks
    }

    createWeekdaysHeader() {
        return this.weekdaysShort.map((day) => {
            return (
                <td key={day} className="week-day">{day}</td>
            )
        });
    };

    onDayClick = (e, day) => {
        this.props.onDayClick && this.props.onDayClick(e, day);
    };

    createDaysInMonth() {
        let daysInMonth = [];
        for (let day = 1; day <= this.daysInMonth(); day++) {
            let className = (day == this.currentDay() ? "day current-day" : "day");
            daysInMonth.push(
                <td key={day} className={className}>
                    <span onClick={ (e) => {this.onDayClick(e, day) }}>{day}</span>
                </td>
            )
        }
        return daysInMonth;
    }
}