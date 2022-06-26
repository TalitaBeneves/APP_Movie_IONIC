import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie/movie.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {


  id;
  note: any;

  constructor(
    private service: MovieService,
    private modatCtrl: ModalController,
    private toast: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.getNoteById(this.id).subscribe((res) => {
      this.note = res;
    });
  }

  async updateNote() {
    this.service.updateNote(this.note);
    const toast = await this.toast.create({
      position: 'top',
      color: 'success',
      header: 'Note Update! 🤗',
      message: `The annotation ${this.note.title} has been updated `,
      duration: 2000,
    });
    this.modatCtrl.dismiss();
    toast.present();
  }

  async deleteNote() {
    this.service.deleteNote(this.note);
    const toast = await this.toast.create({
      position: 'top',
      color: 'danger',
      header: 'Note deleted!',
      message: `The annotation ${this.note.title} has been deleted `,
      duration: 2000,
    });
    this.modatCtrl.dismiss();
    toast.present();
  }

  cancel() {
    this.modatCtrl.dismiss();
  }




}
