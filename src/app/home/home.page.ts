import { Component } from '@angular/core';
import { PdfViewerService } from '../services/pdf-viewer.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private pdf:PdfViewerService) {}

  download(url,title){
     this.pdf.download(url,title)
  }

  open(){
   this.pdf.tosencond3()

  }

}
