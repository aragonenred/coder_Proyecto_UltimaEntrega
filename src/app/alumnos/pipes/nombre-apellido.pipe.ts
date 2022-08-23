import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreApellido'
})
export class NombreApellidoPipe implements PipeTransform {

  transform(value: any): String {
    let salida  = value.nombre + ' ' + value.apellido

    return salida;
  }

}
