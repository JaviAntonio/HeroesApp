import { Component, Input} from '@angular/core';
import { heroe } from '../../interfaces/heroe.interfaces';


@Component({
  selector: 'app-heroe-targeta',
  templateUrl: './heroe-targeta.component.html',
  styles: [`
  mat-card{
    margin-top: 50px;
    margin-bottom: 25px;
  }
`]
})
export class HeroeTargetaComponent {


@Input() heroe! : heroe;


}
