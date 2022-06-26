import {
  AlertController,
  MenuController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ModalComponent } from '../modal/modal.component';
import { Note } from 'src/model/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notes = [];
  currentDate: string;
  message: boolean;

  constructor(
    private service: MovieService,
    private alertCtr: AlertController,
    private modalCtr: ModalController,
    private toast: ToastController,
    private menu: MenuController
  ) {
    this.service.getNotes().subscribe({
      next: (res) => {
        this.notes = res;
        this.message = res.length == 0;
      },
    });
  }

  ngOnInit() {
    this.getDate();
    this.menu.close()
  }

  async openNote(note) {
    const modal = await this.modalCtr.create({
      component: ModalComponent,
      componentProps: { id: note.id },
    });
    modal.present();
  }

  getDate() {
    const date = new Date();
    this.currentDate = date.toLocaleDateString('pt-BR');
  }

  async addNote() {
    const alert = await this.alertCtr.create({
      header: 'Adicionar Nota',
      cssClass: 'alertDanger',
      inputs: [
        {
          name: 'title',
          placeholder: 'Titulo da nota',
          type: 'text',
        },
        {
          name: 'text',
          placeholder: 'Digite o texto',
          type: 'textarea',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alertDanger',
        },
        {
          text: 'Adicionar',
          cssClass: 'alert',
          handler: (res) => {
            this.service.addNote({ title: res.title, text: res.text });
            this.addToast();
          },
        },
      ],
    });

    await alert.present();
  }

  async addToast(note?: Note) {

    const toast = await this.toast.create({
      header: 'Added successfully',
      message: `This note ${note.title} has been added successfully`,
      color: 'success',
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
