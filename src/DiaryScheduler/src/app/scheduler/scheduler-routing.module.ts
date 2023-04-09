import { NgModule } from '@angular/core';
import { EventCalendarComponent } from './calendar/event-calendar.component';
import { EventDetailsComponent } from './details/event-details.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: EventCalendarComponent },
    { path: 'new', data: { title: 'New Event', root: false }, component: EventDetailsComponent },
    { path: ':id', data: { title: 'Event Details', root: false }, component: EventDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class SchedulerRoutingModule { }