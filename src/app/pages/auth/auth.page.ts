import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
  ) {}




  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
  })

  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)

  ngOnInit() {

  }

  // Inicia sesión
  async submit(){
    if (this.form.value){

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signIn(this.form.value as User).then(res => {

        this.getUserInfo(res.user.uid);

      }).catch(error => {
        console.log(error);
        loading.dismiss();
        this.utilsSvc.presentToast("Datos incorrectos","danger")
      }).finally(() => {
        loading.dismiss();
      })
    }
  }

  async getUserInfo(uid: string){
    if (this.form.value){

      const loading = await this.utilsSvc.loading();
      //await loading.present();

      let path = `users/${uid}`;

      this.firebaseSvc.getDocument(path).then((user: User) => {

        this.utilsSvc.saveInLocalStorage('user', user)
        this.utilsSvc.routerLink('/main/home');
        this.form.reset();

        this.utilsSvc.presentToast("Bienvenido","success")

      }).catch(error => {
        console.log(error);
        this.utilsSvc.presentToast("Error","danger")

      }).finally(() => {
        //loading.dismiss();
      })
    }
  }


}
