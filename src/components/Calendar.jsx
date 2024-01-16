import React, { useRef } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import 'react-calendar-timeline/lib/Timeline.css'
import { userData } from "../assests/data";
import { users } from "../assests/users";
import FullCalendar from "@fullcalendar/react";


function Calendar() {

  const calendarRef = useRef(null);

  const events = userData.layers[0].layers.map(event => {
    const user = users.users.find(user => user.id === event.userId);

    return {
      title: `User ${user ? user.name : "Unknown"}`,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
    };
  });

  const handleTwoDayView = () => {
    const currentDate = calendarRef.current.getApi().getDate();
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 2);
    calendarRef.current.getApi().gotoDate(newDate);
  };

  console.log(events);

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay,twoDayButton", // Add the custom button
        }}
        height={"90vh"}
        events={events}
        customButtons={{
          twoDayButton: {
            text: '2 Days',
            click: handleTwoDayView,
          },
        }}
        views={{
          twoDay: {
            type: 'timeGrid',
            duration: { days: 2 },
            buttonText: '2 Days',
          },
        }}
      />

    </div>
  );
}

export default Calendar;
