import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    if(url){
      url = url.replace('watch?v=','embed/');
      url = url.replace('vimeo.com','player.vimeo.com/video');
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
