import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetComponent } from './pages/timesheet/timesheet.component';


const routes: Routes = [
  { path: '', redirectTo: '/timesheet', pathMatch: 'full' },
  { path: 'timesheet', component: TimesheetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
