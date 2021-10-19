import { Component, OnInit } from '@angular/core';
import { Favourites } from 'src/app/interfaces';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  pokemon: any ;
  constructor(private _apiServiceService: ApiServiceService) { }

  ngOnInit(): void {
    let url =  window.location.href;
    var id = url.substring(url.lastIndexOf('/') + 1);

    let favAdded =localStorage.getItem("favourites");
    let favourites: Favourites[] = [];
    
    if(favAdded && favAdded != null){
      favourites = JSON.parse(favAdded);
      let foundData = favourites.filter(x => x.key == parseInt(id));
      if(foundData.length > 0){
        console.log('getting data from local storage');
        this.pokemon = foundData[0].value;
      }
    }else{
        console.log('getting data from api');
        this._apiServiceService.getPokemon(id).subscribe((data) =>{
            console.log(data);
            this.pokemon = data;
        })
    }console.log(this.pokemon );
  }
}
