import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { Injectable } from "@angular/core";
import { FileTransferObject } from "@ionic-native/file-transfer";
import { HttpClient } from '@angular/common/http'
import { Platform } from "@ionic/angular";

import { DocumentViewer } from '@ionic-native/document-viewer/ngx';

@Injectable({
 providedIn: "root"
})
export class PdfViewerService {
 fileTransfer: FileTransferObject;
 api = 'https://41.214.74.215:8020/backenddpi/importation';
 constructor(
 private fileOpener: FileOpener,
 private transfer: FileTransfer,
 private file: File,private http:HttpClient,
 private platform:Platform,
 private documentViewer:DocumentViewer
 ) {}

 download(url: string, title: string) {
 this.fileTransfer = this.transfer.create();
 this.fileTransfer
 .download(url, this.file.dataDirectory + title + ".pdf")
 .then(entry => {
 console.log("download complete: " + entry.toURL());
 this.fileOpener
 .open(entry.toURL(), "application/pdf")
 .then(() => console.log("File is opened"))
 .catch(e => console.log("Error opening file", e));
 });
 }


 webservice() {
  this.http.get(this.api+'/downloadFile/'+'DS20211103007',{responseType:'text'})
    .subscribe((result) => {
      //console.log('result '+result)
       const file = new Blob([result],{type:'application/pdf'})
       var blobURL = window.URL.createObjectURL(file);
       //console.log(blobURL)
       window.open(blobURL);

       this.fileTransfer = this.transfer.create();

       this.fileTransfer
      .download(blobURL, this.file.dataDirectory + 'fichiers' + ".pdf")
      .then(entry => {
      console.log("download complete: " + entry.toURL());
     this.fileOpener
     .open(entry.toURL(), "application/pdf")
     .then(() => console.log("File is opened"))
     .catch(e => console.log("Error opening file", e));
 });

    }, error => {
      console.error(error);
    });
}


// toSecond(){
//   let fileName = 'myFile.pdf';
//   let documentDirectory = this.platform.is('android') ? this.file.dataDirectory : this.file.documentsDirectory;
//   this.http.get(this.api+'/downloadFile/'+'DS20211103007',{responseType:'text'}).
//   subscribe(data => {
//    let blob = new Blob([data], {type: 'application/pdf'});
//     this.file.writeFile(documentDirectory, fileName, data).then(data => {
//        resolve(documentDirectory + 'DS20211103007');
// });
// })
// }

tosencond3(){
  this.http.get(this.api+'/downloadFile/'+'DS20211103007',{responseType:'text'})
  .subscribe((data)=>{
    let pdfblob = new Blob([data],{type:'application/pdf'});
    this.file.writeFile(this.file.dataDirectory,'DocumentA'+'.pdf',pdfblob,{replace:true})
    .then(c=>{
      this.documentViewer.viewDocument(this.file.dataDirectory+"DocumentA"+".pdf", "application/pdf",
        {print: {enabled: true}, bookmarks: {enabled: true}, email: {enabled: true}, title: "doc"});
    });
  })
}

}

