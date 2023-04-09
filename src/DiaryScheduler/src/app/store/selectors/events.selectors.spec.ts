import * as EventsSelectors from '../selectors/events.selectors';
import { EventsState } from '../reducers/events.reducer';

describe('EventsSelectors', () => {
    let initialState: any;
    let initialEventsState: EventsState;

    beforeEach(() => {
        initialEventsState = {
            events: [
                {
                    calendarEventId: '1',
                    dateFrom: new Date(),
                    dateTo: new Date(),
                    allDay: true,
                    title: 'test title 1',
                    description: 'test description 1'
                },
                {
                    calendarEventId: '2',
                    dateFrom: new Date(),
                    dateTo: new Date(),
                    allDay: false,
                    title: 'test title 2',
                    description: 'test description 2'
                }
            ],
            currentEventId: '1'
        };

        initialState = {
            events: initialEventsState
        }
    });

    it('should select events', () => {
        const result = EventsSelectors.selectEvents.projector(initialState.events);

        expect(result.length).toEqual(2);
        expect(result[1].calendarEventId).toEqual('2');
    });

    it('should select currentEventId', () => {
        const result = EventsSelectors.selectCurrentEventId.projector(initialState.events);

        expect(result).toEqual('1');
    });

    it('should select currentEvent when currentEventId is from events collection', () => {
        const result = EventsSelectors.selectCurrentEvent.projector(
            initialState.events,
            initialState.events.currentEventId
        );

        expect(result.calendarEventId).toEqual('1');
        expect(result.title).toEqual('test title 1');
    });

    it('should select currentEvent when currentEventId is null', () => {
        initialState.events = { ...initialState.events, currentEventId: null }

        const result = EventsSelectors.selectCurrentEvent.projector(
            initialState.events,
            initialState.events.currentEventId
        );

        expect(result.calendarEventId).toEqual(null);
    });
});
