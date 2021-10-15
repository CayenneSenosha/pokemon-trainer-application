import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Favourites } from 'src/app/interfaces';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  searchForm: any ;
  isLoading: boolean = false;
  error: any = "";
  pokemons: any  = [] ;
  pokemonTemp: any  = [] ;
  selectedPokemon: any ;
  noDataFound: boolean = true;

  favErrMsg: string = '';
  
  constructor(private formBuilder: FormBuilder , private _apiServiceService: ApiServiceService) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: '',
    });
    this.isLoading = true;
    this._apiServiceService.getLimitPokemon().subscribe((data:any) =>{
      this.isLoading = false ;
      this.noDataFound = false;
      console.log(data);
      this.pokemons = data.results;
      this.selectPokemon(this.pokemons[0].name);
      this.pokemonTemp = this.pokemons;
      this.error = undefined;
    } , (err) =>{
      this.isLoading=false;
      this.error = err.message;
      this.pokemons = undefined;
      this.pokemonTemp = this.pokemons;
      this.noDataFound = true;
    })

    this.onChanges();
  }
  addToFav(data: any){
    let fav: Favourites = {
      key: data.id , value : data
    }
    let favAdded =localStorage.getItem("favourites");
    let favourites: Favourites[] = [];
    this.favErrMsg = '';
    
    if(favAdded){
      favourites = JSON.parse(favAdded);
      if(favourites.filter(x => x.key == data.id).length > 0){
        console.log(`${data.name} already added as fav`);
        this.favErrMsg = `${data.name} has already benn added as favourite pokeman`;
      }else{
        favourites.push(fav);
        localStorage.setItem("favourites",JSON.stringify(favourites));
      }
    }else{
      favourites.push(fav);
      localStorage.setItem("favourites",JSON.stringify(favourites));
    }
      
  }

  onSearch(event:any){
   console.log(event);
  }
  onChanges(): void {
    this.searchForm.valueChanges.subscribe((val:any) => {
        this.pokemons = this.pokemonTemp.filter((x:any)=> x.name.includes(val.search));
        if(this.pokemons.length == 0){
            this.noDataFound = true;
        }else{
          this.noDataFound = false;
        }
    });
  }

  get f(){
    return this.searchForm?.controls;
  }
  onSubmit(){
    console.log(this.f['search'].value);
  }

  pokemonClick(pokemon: any){
      console.log(pokemon);
      this.isLoading = true;
      this.selectPokemon(pokemon.name);
  }

  selectPokemon(name: string){
    this._apiServiceService.getPokemon(name).subscribe((p:any) =>{
      this.selectedPokemon = p;
      this.isLoading = false;
    })
  }
}
