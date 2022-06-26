import { MenuComponent } from './menu.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PerfilPageModule } from '../perfil/perfil.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PerfilPageModule,
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent],
})
export class MenuPageModule {}
