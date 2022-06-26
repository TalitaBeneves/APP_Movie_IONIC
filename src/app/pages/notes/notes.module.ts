import { NotesComponent } from './notes.component';
import { NotesPageRoutingModule } from './notes-routing.module';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NotesComponent],
  imports: [CommonModule, NotesPageRoutingModule, IonicModule],
})
export class NotesModule {}
