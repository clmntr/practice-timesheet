import { State } from '../enums/state.enum';
import { Type } from '../enums/type.enum';
import * as moment from 'moment';

export class TimesheetLine {

    // --------------------------------------------------
    // Properties

    state       : State         = null;
    title       : String        = null;
    type        : Type          = null;
    duration    : String        = null;
    rate        : Number        = null;
    total       : Number        = null;
    edition     : TimesheetLine = null;

    // --------------------------------------------------
    // Constructor

    constructor ( rate : Number ) {
        this.rate = rate;
    }

    // --------------------------------------------------
    // Methods

    /**
     * Method that calculate the total of the line
     */
    public calculateTotal () {
        if ( this.duration && this.rate ) {
            const initial   = moment( this.duration.toString(), "HH:mm" );
            const remainder = 15 - ( initial.minutes() % 15 );
            const fixed     = moment( initial )
            if ( remainder !== 15 ) {
                fixed.add( remainder, "minutes" )
            }
            const hours     = fixed.hours() + fixed.minutes() / 60;
            this.total = hours * Number(this.rate);
        }
    }

    /**
     * Method that updates the line fields based on another line
     * @param source 
     */
    public applyLine ( line : TimesheetLine ) {
        this.state      = line.state      || State.Active;
        this.title      = line.title      || null;
        this.type       = line.type       || null;
        this.duration   = line.duration   || null;
        this.rate       = line.rate       || null;
        this.calculateTotal();
    }

    /**
     * Return a Timesheetline clone from this line
     */
    public clone () : TimesheetLine {
        const line =  new TimesheetLine( this.rate );
        line.applyLine( this );
        return line;
    }
}