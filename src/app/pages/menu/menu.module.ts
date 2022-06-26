import { MenuComponent } from './menu.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PerfilPageModule } from '../perfil/perfil.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PerfilPageModule,
    TranslateModule,
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent],
})
export class MenuPageModule {}
