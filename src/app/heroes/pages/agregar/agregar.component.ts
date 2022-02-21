import { Component, OnInit } from '@angular/core';
import { heroe, Publisher } from '../../interfaces/heroe.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {
    width:80%;
    border-radius: 5px;
  }
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id:'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }
  constructor(private HeroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router:Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return
    }

    this.activatedRoute.params.pipe(
      switchMap( ( {id} )=> this.HeroesService.getHeroePorId(id))
    ).subscribe(
      heroe => this.heroe = heroe
    );

  }

  guardar(){
    if (this.heroe.superhero.trim().length === 0) {
      return
    }

    if (this.heroe.id) {

      this.HeroesService.actualizarHeroe(this.heroe).subscribe(
        heroe => {
          this.mostrarSnackbar('Registro Actualizado');
        }
      )
      
    }else{
    
    this.HeroesService.agregarHeroe(this.heroe).subscribe(
      heroe => {
        this.router.navigate(['/heroes', heroe.id])
        this.mostrarSnackbar('Heroe agregado');
      }
       
    )
  }
  }

  eliminarHeroe(){

     const dialogRef = this.dialog.open(ConfirmarComponent,{
        width: '350px',
        data: this.heroe
      });

        dialogRef.afterClosed().subscribe(
          result => {
            if (result) {
              this.HeroesService.eliminarHeroe(this.heroe.id!).subscribe(
                resp => {
                  this.mostrarSnackbar('Heroe Eliminado');
                  this.router.navigate(['/heroes'])
                }
              );
            }
          }
        )

  }

  mostrarSnackbar(mensaje: string){
    this.snackBar.open(mensaje, 'cerrar',{
      duration: 2000
    })
  }

}
