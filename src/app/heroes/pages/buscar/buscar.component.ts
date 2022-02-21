import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { heroe } from '../../interfaces/heroe.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [`

  `]
})
export class BuscarComponent implements OnInit {

termino : string = '';
heroes : heroe[] = [];

heroeSeleccionado: heroe | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){

      this.heroesService.getBuscando(this.termino)
      .subscribe(  heroes => this.heroes = heroes
        );
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){

    if (!event.option.value) {
      return
    }

        const heroe: heroe = event.option.value;
        this.termino = heroe.superhero;
        
        this.heroesService.getHeroePorId(heroe.id!).subscribe(
          heroe => this.heroeSeleccionado = heroe
        )
  }
}
