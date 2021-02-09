import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  fp_form: FormGroup;
  fp_login_form() {
    this.fp_form = this.formBuilder.group({
      email: [null, Validators.compose([
        Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),
        Validators.required
      ])]
    });
  };
  constructor(private formBuilder: FormBuilder,
              private api:RestApiService) {
    this.fp_login_form();
   }

  ngOnInit() {
  }

  Sendemail(){
    for (let v in this.fp_form.controls) {
      this.fp_form.controls[v].markAsTouched();
    }
    if (this.fp_form.valid) {
      this.api.presentLoading();
      let url = 'api/user/retrieve_password/?user_login=' + `${this.fp_form.value.email}`;
      this.api.get(url)
      .subscribe(data =>{
        this.api.dismissLoading();
        this.api.presentToastWithOptions("Please check your email we have sent a reset password link.");
      }, (err) => {
        this.api.dismissLoading();
        if(err.status == 'error'){
          this.api.presentToastWithOptions(err.error);
        }else{
          this.api.presentToastWithOptions("Something went wrong please try Again!");
        }
      });
    }
  }

}
