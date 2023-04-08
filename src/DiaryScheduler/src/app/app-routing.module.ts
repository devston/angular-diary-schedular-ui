import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './scheduler/calendar/calendar.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'scheduler', component: CalendarComponent, loadChildren: () => import('./scheduler/scheduler.module').then(m => m.SchedulerModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
