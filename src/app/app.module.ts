import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '@components/login/login.component';
import { DetailsComponent } from '@components/details/details.component';
import { TableHeaderComponent } from '@components/common/table-header/table-header.component';
import { CharacteristicsComponent } from './components/common/characteristics/characteristics.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, DetailsComponent, TableHeaderComponent, CharacteristicsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
