import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function TrainingCalendar() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/gettrainings');
      if (!response.ok) {
        throw new Error("Error in fetch: " + response.statusText);
      }
      const data = await response.json();
      setTrainings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const localizer = momentLocalizer(moment);

  const formattedTrainings =
    trainings && Array.isArray(trainings)
    ? trainings.map(training => ({
      ...training,
      title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
      start: moment.utc(training.date).toDate(),
      end: moment.utc(training.date).add(training.duration, 'minutes').toDate(),
    }))
    : [];

  const handleEventClick = event => {
     const { id, date, duration, activity, customer } = event;
     const formattedDate = moment(date).format('DD.MM.YYYY HH:mm');
     alert(`Tapahtuma: ${activity}\nAsiakas: ${customer.firstname} ${customer.lastname}\nPäivä: ${formattedDate}\nKesto: ${duration} min`);
    };

  return (
    <div className="training-calendar" style={{padding: 20}}>
      <Calendar
        localizer={localizer}
        events={formattedTrainings}
        views={['month', 'week', 'day']}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
      />
    </div>
  );
};
