import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import { switchMap } from 'rxjs';
import { heroe } from '../../interfaces/heroe.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
  strong{
    color: #69f0ae;
  }
  img{
    width: 80%;
    border-radius: 10px;
  }
  `]
})
export class HeroeComponent implements OnInit {

  heroe! : heroe;

  constructor(private activatedRoute: ActivatedRoute, 
              private HeroesService: HeroesService,
              private router:Router ) { 
    
  }

  ngOnInit(): void {

this.activatedRoute.params.pipe(
  switchMap(({id})=> this.HeroesService.getHeroePorId(id)),
  ).subscribe(heroe => this.heroe = heroe); 
  }

    regresar(){
      this.router.navigate(['/heroes/listado']);
    }
}
