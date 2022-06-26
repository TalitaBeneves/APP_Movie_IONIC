import { NotesComponent } from './notes.component';
import { NotesPageRoutingModule } from './notes-routing.module';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [NotesComponent],
  imports: [CommonModule, NotesPageRoutingModule, IonicModule, TranslateModule],
})
export class NotesModule {}
