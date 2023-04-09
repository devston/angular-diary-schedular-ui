import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CalendarEventViewModel } from '@shared/models/calendar-event.model';
import { eventsKey, EventsState } from '../reducers/events.reducer';

export const selectEventsState = createFeatureSelector<EventsState>(eventsKey);

export const selectEvents = createSelector(
    selectEventsState,
    (state) => state.events
);

export const selectCurrentEventId = createSelector(
    selectEventsState,
    (state) => state.currentEventId
);

export const selectCurrentEvent = createSelector(
    selectEventsState,
    selectCurrentEventId,
    (state, currentEventId) => {
        if (!currentEventId) {
            const calEvent: CalendarEventViewModel = {
                calendarEventId: null,
                dateFrom: new Date(),
                dateTo: new Date(),
                allDay: false,
                title: '',
                description: ''
            };

            return calEvent;
        }

        return currentEventId ? state.events.find(l => l.calendarEventId === currentEventId) : null;
    }
);
