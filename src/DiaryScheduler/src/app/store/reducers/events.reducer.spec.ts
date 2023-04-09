import * as fromReducer from '@store/reducers/events.reducer';
import * as EventsActions from '@store/actions/events.actions';
import { CalendarEventViewModel } from '@shared/models/calendar-event.model';

describe('eventsReducer', () => {
    let initialState: fromReducer.EventsState;

    beforeEach(() => {
        initialState = fromReducer.initialState;
    });

    describe('unknown action', () => {
        it('should return the default state', () => {
            const action = {
                type: 'Unknown',
            };

            const state = fromReducer.eventsReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('getEventsSuccess action', () => {
        it('should return properly modified state', () => {
            const calEvents: CalendarEventViewModel[] = [
                { calendarEventId: '1', dateFrom: new Date(), dateTo: new Date(), allDay: true, title: 'test event', description: 'test' },
                { calendarEventId: '2', dateFrom: new Date(), dateTo: new Date(), allDay: true, title: 'test event', description: 'test' }
            ];

            const action = EventsActions.getEventsBetweenRangeSuccess({ calendarEvents: calEvents });
            const state = fromReducer.eventsReducer(initialState, action);

            expect(state.events.length).toEqual(2);
        });
    });

    describe('createEventSuccess action', () => {
        it('should return properly modified state', () => {
            const newEvent = { calendarEventId: '3', dateFrom: new Date(), dateTo: new Date(), allDay: true, title: 'test event', description: 'test' };

            const action = EventsActions.createEventSuccess({ eventId: newEvent.calendarEventId });
            const state = fromReducer.eventsReducer(initialState, action);

            expect(state.currentEventId).toEqual(newEvent.calendarEventId);
        });
    });

    describe('updateEventSuccess action', () => {
        it('should return properly modified state', () => {
            const stateBefore = {
                ...initialState,
                items: [
                    { calendarEventId: '1', dateFrom: new Date(), dateTo: new Date(), allDay: true, title: 'test event', description: 'test' },
                    { calendarEventId: '2', dateFrom: new Date(), dateTo: new Date(), allDay: true, title: 'test event', description: 'test' }
                ],
            };
            const updatedEvent = { calendarEventId: '2', dateFrom: new Date(), dateTo: new Date(), allDay: true, title: 'test event', description: 'new description' };

            const action = EventsActions.updateEventSuccess({ eventId: updatedEvent.calendarEventId });
            const state = fromReducer.eventsReducer(stateBefore, action);

            expect(state.events.length).toEqual(2);
            expect(state.currentEventId).toEqual(updatedEvent.calendarEventId);
        });
    });

    describe('setCurrentEvent action', () => {
        it('should return properly modified state', () => {
            const action = EventsActions.setCurrentEvent({ eventId: '2' });
            const state = fromReducer.eventsReducer(initialState, action);

            expect(state.currentEventId).toEqual('2');
        });
    });

    describe('clearCurrentEvent action', () => {
        it('should return properly modified state', () => {
            const action = EventsActions.clearCurrentEvent();
            const state = fromReducer.eventsReducer(initialState, action);

            expect(state.currentEventId).toEqual(null);
        });
    });

    describe('initializeCurrentEvent action', () => {
        it('should return properly modified state', () => {
            const action = EventsActions.initializeCurrentEvent();
            const state = fromReducer.eventsReducer(initialState, action);

            expect(state.currentEventId).toEqual(null);
        });
    });
});
