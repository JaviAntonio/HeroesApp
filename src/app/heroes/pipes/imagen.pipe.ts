import { Pipe, PipeTransform } from '@angular/core';
import { heroe } from '../interfaces/heroe.interfaces';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: heroe): string {

    if (!heroe.id && !heroe.alt_img) {
      return 'assets/no-image.png'
    }else if (heroe.alt_img) {
        return heroe.alt_img;
        
      } else{
        return `assets/heroes/${heroe.id}.jpg`;    
      }
    
  }

}
