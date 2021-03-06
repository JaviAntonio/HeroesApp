import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { heroe } from '../../interfaces/heroe.interfaces';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
      mat-card{
        margin-top: 20px;
      }
  `]
})
export class ListadoComponent implements OnInit {

    heroes : heroe[] = [];

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {

      this.heroesService.getHeroes()
          .subscribe(heroes => this.heroes = heroes);
  }

}
