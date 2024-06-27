import moment from 'moment';

const Calander = (props) => {
    const days = moment.weekdaysShort();
    return (
        <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", marginLeft: "20px", padding: '20px' }}>
            <div className="fcToolbar mgBottom20">
                <div>
                    <button className="calanderButton brLeft" onClick={props.setPreviousMonth}><i className="fa fa-chevron-left" /></button>
                    <button className="calanderButton brRight mgRight5" onClick={props.setNextMonth}><i className="fa fa-chevron-right" /></button>
                    <button className="calanderButton mgLeft5 bolder br" onClick={props.resetToCurrentDate}>Today</button>
                </div>
                <div>
                    <h4 className="mg0 bolder darkGray">{moment(props.currentDate).format('MMMM YYYY')} </h4>
                </div>
                <div>
                    <button className="calanderButton brLeft calanderButtonSelected">Month</button>
                    <button className="calanderButton">Week</button>
                    <button className="calanderButton brRight">Day</button>
                </div>
            </div>
            <div>
                <table className="calander">
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            {days.map(e => (<th key={e}>{e}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {props.rows()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Calander;