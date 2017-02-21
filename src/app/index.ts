import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes';

import {TechsModule} from './techs';

import {MainComponent} from './components/main';
import {HeaderComponent} from './header/header';
import {TitleComponent} from './components/title';
import {FooterComponent} from './footer/footer';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    TechsModule
  ],
  declarations: [
    RootComponent,
    MainComponent,
    HeaderComponent,
    TitleComponent,
    FooterComponent
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
