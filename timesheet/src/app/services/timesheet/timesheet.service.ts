import { Injectable } from '@angular/core';
import { Timesheet } from 'src/app/model/timesheet';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

    // --------------------------------------------------
    // Properties

    public current : Timesheet = null;

    // --------------------------------------------------
    // Constructor

    constructor() { 
        this.current = new Timesheet();
    }

    // --------------------------------------------------
    // Methods

    /**
     * Method that set the current timesheet
     * @param timesheet 
     */
    public setTimesheet( timesheet: Timesheet ) {
        this.current = timesheet;
    }
}
