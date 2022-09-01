import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad'
})
export class EdadPipe implements PipeTransform {
  //2022-03-03T20:58:28.169Z
  transform(value: string ): string {
    const convertAge = new Date(value.substring(0, 10));
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    let edad = (Math.floor((timeDiff / (1000 * 3600 * 24))/365));
    return String(edad);
  }

}
