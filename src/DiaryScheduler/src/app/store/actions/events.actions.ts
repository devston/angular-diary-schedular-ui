import { createAction, props } from '@ngrx/store';
import { CalendarEventViewModel } from '@shared/models/calendar-event.model';

const GET_EVENTS_BETWEEN_RANGE = '[Events] Get Calendar Events Between Date Range';
const GET_EVENTS_BETWEEN_RANGE_SUCCESS = '[Events] Get Calendar Events Between Date Range Successful';
const GET_EVENTS_BETWEEN_RANGE_FAILURE = '[Events] Get Calendar Events Between Date Range Failed';
const GET_EVENT = '[Events] Get Calendar Event';
const GET_EVENT_SUCCESS = '[Events] Get Calendar Event Successful';
const GET_EVENT_FAILURE = '[Events] Get Calendar Event Failed';
const CREATE_EVENT = '[Events] Create Calendar Event';
const CREATE_EVENT_SUCCESS = '[Events] Create Calendar Event Successful';
const CREATE_EVENT_FAILURE = '[Events] Create Calendar Event Failed';
const UPDATE_EVENT = '[Events] Update Calendar Event';
const UPDATE_EVENT_SUCCESS = '[Events] Update Calendar Event Successful';
const UPDATE_EVENT_FAILURE = '[Events] Update Calendar Event Failed';
const DELETE_EVENT = '[Events] Delete Calendar Event';
const DELETE_EVENT_SUCCESS = '[Events] Delete Calendar Event Successful';
const DELETE_EVENT_FAILURE = '[Events] Delete Calendar Event Failed';
const SET_CURRENT_EVENT = '[Events] Set Current Calendar Event';
const CLEAR_CURRENT_EVENT = '[Events] Clear Current Calendar Event';
const INITIALIZE_CURRENT_EVENT = '[Events] Initialize Current Calendar Event';

export const getEventsBetweenRange = createAction(
    GET_EVENTS_BETWEEN_RANGE,
    props<{ dateFrom: Date, dateTo: Date }>()
);

export const getEventsBetweenRangeSuccess = createAction(
    GET_EVENTS_BETWEEN_RANGE_SUCCESS,
    props<{ calendarEvents: CalendarEventViewModel[] }>()
);

export const getEventsBetweenRangeFailure = createAction(
    GET_EVENTS_BETWEEN_RANGE_FAILURE,
    props<{ error: any }>()
);

export const getEvent = createAction(
    GET_EVENT,
    props<{ eventId: string }>()
);

export const getEventSuccess = createAction(
    GET_EVENT_SUCCESS,
    props<{ calendarEvent: CalendarEventViewModel }>()
);

export const getEventFailure = createAction(
    GET_EVENT_FAILURE,
    props<{ error: any }>()
);

export const createEvent = createAction(
    CREATE_EVENT,
    props<{ calEvent: CalendarEventViewModel }>()
);

export const createEventSuccess = createAction(
    CREATE_EVENT_SUCCESS,
    props<{ eventId: string }>()
);

export const createEventFailure = createAction(
    CREATE_EVENT_FAILURE,
    props<{ error: any }>()
);

export const updateEvent = createAction(
    UPDATE_EVENT,
    props<{ calEvent: CalendarEventViewModel }>()
);

export const updateEventSuccess = createAction(
    UPDATE_EVENT_SUCCESS,
    props<{ eventId: string }>()
);

export const updateEventFailure = createAction(
    UPDATE_EVENT_FAILURE,
    props<{ error: any }>()
);

export const deleteEvent = createAction(
    DELETE_EVENT,
    props<{ eventId: string }>()
);

export const deleteEventSuccess = createAction(
    DELETE_EVENT_SUCCESS,
    props<{ message: string }>()
);

export const deleteEventFailure = createAction(
    DELETE_EVENT_FAILURE,
    props<{ error: any }>()
);

export const setCurrentEvent = createAction(
    SET_CURRENT_EVENT,
    props<{ eventId: string }>()
);

export const clearCurrentEvent = createAction(
    CLEAR_CURRENT_EVENT
);

export const initializeCurrentEvent = createAction(
    INITIALIZE_CURRENT_EVENT
);