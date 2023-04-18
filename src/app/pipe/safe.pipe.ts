import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer){

  }
  transform(url:string) {
    return this.sanitizer.sanitize(SecurityContext.URL, url)
  }

}
