import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingController: LoadingController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.montaForm();
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.form.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/movies', { replaceUrl: true });
    } else {
      this.authService.showAlert(
        'O Cadastramento falhou',
        'Por Favor tente novamente!'
      );
    }
  }

  montaForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
}
