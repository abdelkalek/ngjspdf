import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FactureArComponent } from './facture-ar/facture-ar.component';
import { FactureArV2Component } from './facture-ar-v2/facture-ar-v2.component';
import { FacruteFrComponent } from './facrute-fr/facrute-fr.component';
import { FactureFrv2Component } from './facture-frv2/facture-frv2.component';
@NgModule({
  declarations: [
    AppComponent,
    FactureArComponent,
    FactureArV2Component,
    FacruteFrComponent,
    FactureFrv2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
