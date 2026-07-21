import React from 'react';
import './EventCard.css';

export default function EventCard({ date, month, title, description, category, time,location }) {

return (
    <div className="event-card">
        <div className="event-card__date-box">
            <span className="event-card__day">{date}</span>
            <span className="event-card__month">{month}</span>
        </div>
        <div className="event-card__body">
            <span className="event-card__category"> {category}</span>
            <h4 className="event-card__title">{title}</h4>
            <p className="event-card__desc">{description}</p>
            <div className="event-card__meta">
                {time && <span> (time)</span>}      
                {location && <span> {location}</span>}
            </div>
        </div>
    </div>
);
}