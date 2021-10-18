import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Favourites } from 'src/app/interfaces';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: Favourites[] = []
  constructor(private router: Router) { }

  ngOnInit(): void {
   let fav =localStorage.getItem("favourites");
   if(fav){
     this.favourites = JSON.parse(fav);
   }
  }

  gotToPokemon(pokemon: any){
    console.log(pokemon);
    this.router.navigateByUrl("pokemon/"+ pokemon.id)
  }
}