import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { ViewerComponent } from './features/viewer/viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    FavoritesComponent,
    ViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
