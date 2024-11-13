import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EjsGridComponent } from './ejs-grid/ejs-grid.component';
import { GridModule, SortService } from '@syncfusion/ej2-angular-grids';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './service/http.service';

@NgModule({
  declarations: [
    AppComponent,
    EjsGridComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GridModule
  ],
  providers: [
    HttpService,
    SortService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
