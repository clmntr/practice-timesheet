import { TimesheetLine } from './timesheet-line';

export class Timesheet {

    // --------------------------------------------------
    // Properties

    lines       : Array<TimesheetLine>  = [];
    defaultRate : Number                = 250;

    // --------------------------------------------------
    // Constructor

    constructor () {
        // do nothing
    }

    // --------------------------------------------------
    // Methods

    /**
     * Method that add a line to the timesheet with the default values
     */
    public addLine () : TimesheetLine {
        const line =  new TimesheetLine( this.defaultRate )
        this.lines.unshift(line);
        return line;
    }
    
}