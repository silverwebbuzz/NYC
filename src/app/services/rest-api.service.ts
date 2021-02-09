import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ToastController, LoadingController, ModalController } from '@ionic/angular';


const httpOptions = {
  headers: new HttpHeaders()
};

const API_URL = "https://go-demo.co/nycwn-new";

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  isLoading = false;
  isModalOpen = false;
  constructor(private http: HttpClient, public toastCtrl: ToastController, public loadingController: LoadingController, public modal: ModalController) { }
  
  private handleError(error: HttpErrorResponse) {
    //console.log('log : ',error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error);
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  get(URL: string): Observable<any>{
    let url = `${API_URL}/${URL}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  getbyid(URL: string, id: string):Observable<any> {
    let url = `${API_URL}/${URL}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  post(URL:string, Body): Observable<any>{
    let url = `${API_URL}/${URL}`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(url, Body, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  delete(URL: string) {
    let url = `${API_URL}/${URL}`;
    return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  put(URL: string, Body: any) {
    let url = `${API_URL}/${URL}`;
    return this.http.put(url, Body, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  async presentToastWithOptions(message?, cssClass?, position?) {
    const toast = await this.toastCtrl.create({
      message: message ? message : null,
      duration: 10000,
      position: position ? position : 'bottom',
      cssClass: cssClass ? cssClass : 'dark-trans login-toster',
      closeButtonText: 'OK',
      showCloseButton: true
    });
    toast.present();
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismissLoading(){
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }

  async presentModal(PageName){
    this.isModalOpen = true;
    return await this.modal.create({
      component: PageName,
      }).then(a=>{
        a.present().then(() =>{
          if(!this.isModalOpen){
            a.dismiss();
          }
        })
      });
  }

  async dismissModal(){
    this.isModalOpen = false;
    return await this.modal.dismiss();
  }
} 
