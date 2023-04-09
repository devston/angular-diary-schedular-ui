import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { AppState } from '@store/app.state';
import { CalendarEventViewModel } from '@shared/models/calendar-event.model';
import * as EventsSelectors from '@store/selectors/events.selectors';
import * as EventsActions from '@store/actions/events.actions';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent implements OnInit, OnDestroy {
    // TODO: Hook up the events to the store.
    calendarEvents$: Observable<CalendarEventViewModel[]>;
    TODAY_STR = new Date().toISOString().replace(/T.*$/, '');
    INITIAL_EVENTS: EventInput[] = [
        {
          id: '1',
          title: 'All-day event',
          start: this.TODAY_STR
        },
        {
          id: '2',
          title: 'Timed event',
          start: this.TODAY_STR + 'T00:00:00',
          end: this.TODAY_STR + 'T03:00:00'
        },
        {
          id: '3',
          title: 'Timed event',
          start: this.TODAY_STR + 'T12:00:00',
          end: this.TODAY_STR + 'T15:00:00'
        }
      ];
    calendarOptions: CalendarOptions = {
        plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        ],
        headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialView: 'dayGridMonth',
        initialEvents: this.INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        weekends: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this)
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
    };
    currentEvents: EventApi[] = [];

    subscriptions: Subscription[] = [];

    constructor(
      private changeDetector: ChangeDetectorRef,
      private store: Store<AppState>,
      private actionsSubject: ActionsSubject,
      private router: Router,) 
    { 

    }

    ngOnInit(): void {
      this.calendarEvents$ = this.store.select(EventsSelectors.selectEvents);

      this.initializeSubscriptions();
    }

    ngOnDestroy(): void {
      this.subscriptions.forEach(x => x.unsubscribe());
    }

    initializeSubscriptions(): void {
      this.subscriptions.push(
          this.actionsSubject.pipe(
              ofType(
                  EventsActions.createEventSuccess,
                  EventsActions.deleteEventSuccess,
              )
          ).subscribe(() => this.onRefresh())
      );
    }

    onRefresh(): void {
      //this.store.dispatch(EventsActions.getEventsBetweenRange());
    }
    
    handleWeekendsToggle() {
      const { calendarOptions } = this;
      calendarOptions.weekends = !calendarOptions.weekends;
    }

    handleDateSelect(selectInfo: DateSelectArg) {
      const title = prompt('Please enter a new title for your event');
      const calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection

      if (title) {
          calendarApi.addEvent({
          id: '0',
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
          });
      }
    }

    handleEventClick(clickInfo: EventClickArg) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
          clickInfo.event.remove();
      }
    }

    handleEvents(events: EventApi[]) {
      this.currentEvents = events;
      this.changeDetector.detectChanges();
    }
}
