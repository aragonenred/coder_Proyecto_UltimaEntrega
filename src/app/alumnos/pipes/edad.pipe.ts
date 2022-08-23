import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad'
})
export class EdadPipe implements PipeTransform {

  transform(value: string ): string {
    const convertAge = new Date(value);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());

    let edad = (Math.floor((timeDiff / (1000 * 3600 * 24))/365));
    return String(edad);
  }

}
