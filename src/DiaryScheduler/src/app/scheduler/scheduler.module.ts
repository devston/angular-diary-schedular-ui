import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
//import { SchedulerRoutingModule } from './scheduler-routing.module';
import { EventsEffects } from '@store/effects/events.effects';
import { eventsKey, eventsReducer } from '@store/reducers/events.reducer';
import { EventsHttpService } from '@shared/services/http-services/events-http.service';
import { EventCalendarModule } from './calendar/event-calendar.module';
import { EventDetailsModule } from './details/event-details.module';

@NgModule({
    imports: [
        SharedModule,
        StoreModule.forFeature(eventsKey, eventsReducer),
        EffectsModule.forFeature([EventsEffects]),
        //SchedulerRoutingModule,
        EventCalendarModule,
        EventDetailsModule
    ],
    providers: [EventsHttpService]
})
export class SchedulerModule { }