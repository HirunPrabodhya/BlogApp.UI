import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NoSantizePipe } from './no-santize.pipe';

@NgModule({
  declarations: [
    NoSantizePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    NoSantizePipe
  ]
})
export class SharedModule { }
