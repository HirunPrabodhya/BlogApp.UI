import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'noSantize'
})
export class NoSantizePipe implements PipeTransform {

  
  constructor(private domSanitizer: DomSanitizer) {
  
  }

  transform(htmlContent:string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(htmlContent);
  }

}
