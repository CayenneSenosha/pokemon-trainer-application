import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouritesComponent } from './features/favourites/favourites.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { PokemonDetailsComponent } from './features/pokemon-details/pokemon-details.component';

const routes: Routes = [{path:'favourite' , component:FavouritesComponent},
{path:'pokemon/:id' , component:PokemonDetailsComponent},
{path:'**' , component:HomepageComponent}];
//HomepageComponent

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
