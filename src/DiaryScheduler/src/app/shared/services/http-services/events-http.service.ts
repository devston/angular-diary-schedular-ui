import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarEventViewModel } from '@shared/models/calendar-event.model';
import { httpOptions, urlPaths } from '@shared/constants';
import { Observable } from 'rxjs';

@Injectable()
export class EventsHttpService {
    constructor(private httpClient: HttpClient) { }

    getEventsBetweenDateRange(startDate: Date, endDate: Date): Observable<CalendarEventViewModel[]> {
        const url = `${urlPaths.eventManagementUrl}/events`;

        const params = new HttpParams()
            .set('startDate', startDate.toISOString())
            .set('endDate', endDate.toISOString());

        return this.httpClient.get<CalendarEventViewModel[]>(url, { ...httpOptions, params });
    }

    getEventById(eventId: string): Observable<CalendarEventViewModel> {
        const url = `${urlPaths.eventManagementUrl}/events/${eventId}`;
        
        return this.httpClient.get<CalendarEventViewModel>(url, httpOptions);
    }

    createEvent(calEvent: CalendarEventViewModel): Observable<string> {
        const url = `${urlPaths.eventManagementUrl}/events`;

        return this.httpClient.post<string>(url, calEvent, httpOptions);
    }

    updateEvent(calEvent: CalendarEventViewModel) : Observable<string> {
        const url = `${urlPaths.eventManagementUrl}/events/${calEvent.calendarEventId}`;

        return this.httpClient.put<string>(url, calEvent, httpOptions);
    }

    deleteEvent(eventId: string) : Observable<string> {
        const url = `${urlPaths.eventManagementUrl}/events/${eventId}`;

        return this.httpClient.delete<string>(url, httpOptions);
    }
}