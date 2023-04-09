import * as EventsActions from '../actions/events.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { mergeMap, catchError, withLatestFrom, tap } from 'rxjs/operators';
//import { ToastMessageService } from '@shared/services/toast-message.service';
import { AppState } from '@store/app.state';
import { EventsHttpService } from '@shared/services/http-services/events-http.service';

@Injectable()
export class EventsEffects {
    private eventDomainName = 'CalendarEvent';

    constructor(
        private actions$: Actions,
        private eventsService: EventsHttpService,
        private store: Store<AppState>,
        //private messageService: ToastMessageService
    ) { }

    // TODO: Add the toast message service to report events to the user.
    getEventsBetweenRange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventsActions.getEventsBetweenRange),
            mergeMap(action => this.eventsService.getEventsBetweenDateRange(action.dateFrom, action.dateTo).pipe(
                mergeMap(response => {
                    return [EventsActions.getEventsBetweenRangeSuccess({ calendarEvents: response })]
                }),
                catchError((error: any) => of(EventsActions.getEventsBetweenRangeFailure({ error })))
            ))
        )
    );

    getEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventsActions.getEvent),
            mergeMap(action => this.eventsService.getEventById(action.eventId).pipe(
                mergeMap(response => {
                    return [EventsActions.getEventSuccess({  calendarEvent: response })];
                }),
                catchError((error: any) => of(EventsActions.getEventFailure({ error })))
            ))
        )
    );

    createEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventsActions.createEvent),
            mergeMap(action => this.eventsService.createEvent(action.calEvent).pipe(
                //tap(() => this.messageService.showCreatedMessage(this.eventDomainName)),
                mergeMap(response => [EventsActions.createEventSuccess({ eventId: response })]),
                catchError((error: any) => of(EventsActions.createEventFailure({ error })))
            ))
        )
    );

    updateEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventsActions.updateEvent),
            mergeMap(action => this.eventsService.updateEvent(action.calEvent).pipe(
                //tap(() => this.messageService.showUpdatedMessage(this.eventDomainName)),
                mergeMap(response => [EventsActions.updateEventSuccess({ eventId: response })]),
                catchError((error: any) => of(EventsActions.updateEventFailure({ error })))
            ))
        )
    );

    deleteEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventsActions.deleteEvent),
            mergeMap(action => this.eventsService.deleteEvent(action.eventId).pipe(
                //tap(() => this.messageService.showDeletedMessage(this.eventDomainName)),
                mergeMap(response => [EventsActions.deleteEventSuccess({ message: response })]),
                catchError((error: any) => of(EventsActions.deleteEventFailure({ error })))
            ))
        )
    );
}
