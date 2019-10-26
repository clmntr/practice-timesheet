import { Component, OnInit } from '@angular/core';
import { TimesheetService } from 'src/app/services/timesheet/timesheet.service';
import { Timesheet } from 'src/app/model/timesheet';
import { TimesheetLine } from 'src/app/model/timesheet-line';
import { State } from 'src/app/enums/state.enum'
import { Type } from 'src/app/enums/type.enum'

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {

    // --------------------------------------------------
    // Properties

    public timesheet    : Timesheet = null;
    public selected     : Array<TimesheetLine> = [];
    public states       = State;
    public types        = Type;

    // --------------------------------------------------
    // Constructor

    constructor( private timesheetService : TimesheetService ) { }
    
    // --------------------------------------------------
    // Methods

    ngOnInit() {
        this.timesheet = this.timesheetService.current;
    }

    /**
     * Add a line to the timesheet in the editing mode
     */
    addLine() {
        let line = this.timesheet.addLine();
        this.editLine( line );
    }

    /**
     * Create an edition line base on the line selected
     * @param line 
     */
    editLine ( line: TimesheetLine ) {
        line.edition = line.clone();
    }
    
    /**
     * Remove the edition line from the selected line
     * @param line 
     */
    cancelLine ( line: TimesheetLine ) {
        if ( !line.state ) {
            this.deleteLine( line );
        }
        else {
            line.edition = null;
        }
    }

    /**
     * Save the edition version of the line
     * @param line 
     */
    saveLine ( line: TimesheetLine ) {
        line.state = this.states.Active;
        if ( line.edition ) {
            line.applyLine( line.edition );
            line.edition = null;
        }
    }

    /**
     * Remove the line selected from the timesheet
     * @param index 
     */
    deleteLine ( line: TimesheetLine ) {
        const index = this.timesheet.lines.indexOf( line );
        if ( index >= 0 ) {
            this.timesheet.lines.splice( index, 1 );
        }
    }

    /**
     * Submit the selected lines
     */
    submit() {

    }

    /**
     * Calculate the total for a line
     * @param line 
     */
    calculateTotal ( line: TimesheetLine ) {
        line.calculateTotal();
    }
}
