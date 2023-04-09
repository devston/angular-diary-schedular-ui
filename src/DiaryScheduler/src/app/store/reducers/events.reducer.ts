import * as EventsActions from '../actions/events.actions';
import { createReducer, on } from '@ngrx/store';
import { CalendarEventViewModel } from '@shared/models/calendar-event.model';
import { AppState } from '@store/app.state';

export const eventsKey = 'calEvents';

export interface EventsState extends AppState {
    events: CalendarEventViewModel[];
    currentEventId: string | null;
}

export const initialState: EventsState = {
    events: [],
    currentEventId: null
};

const reducer = createReducer(
    initialState,
    on(EventsActions.getEventsBetweenRange, (state) => state),
    on(EventsActions.getEventsBetweenRangeSuccess, (state, action) => {
        return {
            ...state,
            events: action.calendarEvents
        };
    }),
    on(EventsActions.getEventsBetweenRangeFailure, (state) => state),
    on(EventsActions.getEvent, (state) => state),
    on(EventsActions.getEventSuccess, (state, action) => {
        let updatedEvents: CalendarEventViewModel[];
        if (state.events.some(i => i.calendarEventId === action.calendarEvent.calendarEventId)) {
            updatedEvents = state.events.map(
                i => action.calendarEvent.calendarEventId === i.calendarEventId ? action.calendarEvent : i
            );
        } else {
            updatedEvents = [...state.events, action.calendarEvent];
        }

        return {
            ...state,
            events: updatedEvents
        };
    }),
    on(EventsActions.getEventFailure, (state) => state),
    on(EventsActions.createEvent, (state) => state),
    on(EventsActions.createEventSuccess, (state, action) => {
        return {
            ...state,
            currentEventId: action.eventId
        };
    }),
    on(EventsActions.createEventFailure, (state) => state),
    on(EventsActions.updateEvent, (state) => state),
    on(EventsActions.updateEventSuccess, (state, action) => {
        return {
            ...state,
            currentEventId: action.eventId
        };
    }),
    on(EventsActions.updateEventFailure, (state) => state),
    on(EventsActions.deleteEvent, (state) => state),
    on(EventsActions.deleteEventSuccess, (state) => state),
    on(EventsActions.deleteEventFailure, (state) => state),
    on(EventsActions.setCurrentEvent, (state, action) => {
        return {
            ...state,
            currentEventId: action.eventId
        };
    }),
    on(EventsActions.clearCurrentEvent, (state) => {
        return {
            ...state,
            currentEventId: null
        };
    }),
    on(EventsActions.initializeCurrentEvent, (state) => {
        return {
            ...state,
            currentEventId: null
        };
    }),
);

export function eventsReducer(state, action): EventsState {
    return reducer(state, action);
}