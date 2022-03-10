import React, {FC} from 'react';
import {Calendar} from "antd";
import {Moment} from "moment";

import {IEvent} from "../models/IEvent";
import {formatDate} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypedSelector";


interface EventCalendarProps {
    events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
    const {user} = useTypedSelector(state => state.auth)

    function dateCellRender(value: Moment) {
        const formattedDate = formatDate(value.toDate());
        const currentDayEvents = props.events.filter(ev => ev.date === formattedDate);
        return (
            <div>
                {currentDayEvents.map((ev, index) =>
                    <div key={index}>
                        {ev.author !== user.username ? `${ev.author}: ` : null}
                        {ev.description}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Calendar dateCellRender={dateCellRender}/>
    );
};

export default EventCalendar;