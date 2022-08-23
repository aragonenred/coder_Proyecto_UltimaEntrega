import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pais'
})
export class PaisPipe implements PipeTransform {

  transform(value: string): HTMLElement {
    let html:HTMLElement = document.createElement('img');

    switch (value) {
      case 'Argentina':
        html.setAttribute('src','https://img.geonames.org/flags/x/ar.gif');
        break;

      case 'Brasil':
        html.setAttribute('src','https://img.geonames.org/flags/x/br.gif');
        break;

      case 'Bolivia':
        html.setAttribute('src','https://img.geonames.org/flags/x/bo.gif');
        break;

      case 'Chile':
        html.setAttribute('src','https://img.geonames.org/flags/x/cl.gif');
        break;

      case 'Paraguay':
        html.setAttribute('src','https://img.geonames.org/flags/x/py.gif');
        break;

      case 'Uruguay':
        html.setAttribute('src','https://img.geonames.org/flags/x/uy.gif');
        break;

      default:
        break;
    }






    return html;




  }

}
