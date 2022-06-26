import { PerfilComponent } from './perfil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [PerfilComponent],
  exports: [PerfilComponent],
})
export class PerfilPageModule {}
