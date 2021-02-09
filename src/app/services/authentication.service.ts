import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, generate } from 'rxjs';
import { RestApiService } from './rest-api.service';


const TOKEN_KEY = 'auth-token';

const NETWORK_TYPE = 'network-type';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  NetworktypeState = new BehaviorSubject('Public');
  authenticationState = new BehaviorSubject(false);
  userDetails = new BehaviorSubject(null);

  constructor(public storage: Storage, private plt: Platform,
    private api: RestApiService) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
  login(TOKEN_VALUE: string) {
    this.storage.set(TOKEN_KEY, `${TOKEN_VALUE}`);
  }
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  setNetworkType(TYPE_VALUE:string){
    console.log('TYPE_VALUE:',TYPE_VALUE);
    this.NetworktypeState.next(TYPE_VALUE);
  }

  generateNonce() {
    return this.api.get('api/get_nonce/?controller=user&method=generate_auth_cookie')
      .subscribe(data => {
        if (data) {
          return data.nonce;
        }

      });
  }

  validateAuthCookie() {
    return this.storage.get('Auth_Cookie').then(res => {
      if (res) {
        let URL = 'api/user/validate_auth_cookie/?cookie=' + `${res}`;
        return this.api.get(URL)
          .subscribe(data => {
            if (data.valid == false) {
              this.generateAuthCookie();
            }
          })
      }

    });
  }

  generateAuthCookie(userDetails?) {
    //this.generateNonce();
    if (userDetails) {
      let URL = 'api/user/generate_auth_cookie/?username=' + `${userDetails.email}` + '&password=' + `${userDetails.password}`;
      this.api.get(URL)
        .subscribe(data => {
          console.log('AuthCate12:', data)
          if (data) {
            this.storage.set('Auth_Cookie', data.cookie);
            this.setUserDetails(data.user).then(res => {
              this.authenticationState.next(true);
            });
          }
        }, (err) => {
          this.api.presentToastWithOptions(err.error);
        });
    } else {
      this.getUser()
        .then(res => {
          console.log('state3:', res);
          if (res) {
            let URL = 'api/user/generate_auth_cookie/?username=' + `${res.email}` + '&password=' + `${res.password}`;
            this.api.get(URL)
              .subscribe(data => {
                console.log('AuthCate23:', data)
                if (data) {
                  this.storage.set('Auth_Cookie', data.cookie);
                  this.setUserDetails(data.user).then(res => {
                    this.authenticationState.next(true);
                  });
                }
              }, (err) => {
                this.api.presentToastWithOptions(err.error);
              });
          }
        });
    }
  }


  setUserDetails(userDetails) {
    return this.storage.set('UserDetails', userDetails);
  }

  getUserDetails() {
    return this.storage.get('UserDetails');
  }

  getUser() {
    return this.storage.get('User');
  }

  setUser(user) {
    this.storage.set('User', user);
  }
  isAuthenticated() {
    return this.authenticationState.value;
  }
}
