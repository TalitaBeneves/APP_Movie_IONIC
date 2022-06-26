import { ModalComponent } from './modal.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalRoutingModule } from './modal-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalRoutingModule
  ],
})
export class ModalModule {}
