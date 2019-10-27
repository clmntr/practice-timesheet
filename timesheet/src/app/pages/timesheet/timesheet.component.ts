import { Component, OnInit } from '@angular/core';
import { TimesheetService } from 'src/app/services/timesheet/timesheet.service';
import { Timesheet } from 'src/app/model/timesheet';
import { TimesheetLine } from 'src/app/model/timesheet-line';
import { State } from 'src/app/enums/state.enum'
import { Type } from 'src/app/enums/type.enum'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

    constructor( private timesheetService : TimesheetService, private modalService: NgbModal ) { }
    
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
            this.timesheetService.deleteLine( line );
        }
        else {
            line.edition = null;
        }
    }

    /**
     * Helper method to tell if the user can save or not the edition line
     * @param line 
     */
    cannotSave ( line : TimesheetLine ) {
        return !line.title || !line.type || !line.duration;
    }

    /**
     * Save the edition version of the line
     * @param line 
     */
    saveLine ( line: TimesheetLine ) {
        this.timesheetService.saveline( line );
    }

    /**
     * Method that toggle the line selection
     * @param $event 
     * @param line 
     */
    toggleSelect ( $event : any, line: TimesheetLine ) {
        if ( $event.currentTarget.checked ) {
            this.selected.push( line );
        }
        else {
            const index = this.selected.indexOf( line );
            this.selected.splice( index, 1 );
        }
    }

    /**
     * Submit the selected lines
     */
    submit() {
        this.timesheetService.submitLines( this.selected );
        this.selected = [];
    }

    /**
     * Display a modal in order to validate the suppression of a line
     * @param delModal 
     * @param line 
     */
    displayDeleteModal( delModal: any, line: TimesheetLine ) {
        this.modalService
            .open( delModal, { ariaLabelledBy: 'modal-basic-title', centered: true } ).result
            .then( () => {
                this.timesheetService.deleteLine( line );
            })
    }

    /**
     * Calculate the total for a line
     * @param line 
     */
    calculateTotal ( line: TimesheetLine ) {
        line.calculateTotal();
    }
}
