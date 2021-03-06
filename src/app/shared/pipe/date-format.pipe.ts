import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value) {
      return new Date(value).toISOString().substring(0, 10);
    }
    return null;
  }

}
