import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './enTete/header/header.component';
import { FooterComponent } from './enTete/footer/footer.component';
import { ListeComponent } from './main/liste/liste.component';
import { CreerComponent } from './main/creer/creer.component';
import { ModifierComponent } from './main/modifier/modifier.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListeComponent,
    CreerComponent,
    ModifierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule,
  

    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
