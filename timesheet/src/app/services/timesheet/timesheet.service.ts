import { Injectable } from '@angular/core';
import { Timesheet } from 'src/app/model/timesheet';
import { TimesheetLine } from 'src/app/model/timesheet-line';
import { State } from 'src/app/enums/state.enum';

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
        // initialize with default timesheet
        // Should be provided in a real app through setTimesheet
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

    /**
     * Method that save a line in the current timesheet
     * Should call the backend in a real app
     * @param line 
     */
    public saveline( line: TimesheetLine ) {
        line.state = State.Active;
        if ( line.edition ) {
            line.applyLine( line.edition );
            line.edition = null;
        }
    }

    /**
     * Method that delete an active line in the current timesheet
     * Should call the backend in a real app
     * @param line 
     */
    public deleteLine( line: TimesheetLine ) {
        const index = this.current.lines.indexOf( line );
        if ( index >= 0 ) {
            this.current.lines.splice( index, 1 );
        }
    }

    /**
     * Method that submit the lines in the current timesheet
     * Should call the backend in a real app
     * @param lines 
     */
    public submitLines( lines: Array<TimesheetLine> ) {
        let len = lines.length;
        while ( len-- ) {
            lines[ len ].state = State.Submitted;
        }
    }
}
