import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  transform( value: any ): Array<any> {
    const values = Object.values(value);
    return values.slice( values.length / 2);
  }

}
