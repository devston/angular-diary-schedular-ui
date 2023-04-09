import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EventCalendarComponent } from './event-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
    declarations: [EventCalendarComponent],
    imports: [
        SharedModule,
        FullCalendarModule
    ],
    exports: [EventCalendarComponent]
})
export class EventCalendarModule { }