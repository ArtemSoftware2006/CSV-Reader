import { Injectable } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private data : any[] = [];
  private selectedFile : File;
  private parser : NgxCsvParser = new NgxCsvParser();
  private dataObs?: Observable<any[]>

  constructor() { 
    this.selectedFile = new File([], '');
  }

  setFile(file : File) {
    this.selectedFile = file;
  }

  getFile() : File {
    return this.selectedFile
  }

  getCsvAsArray() {

    return this.parser.parse(this.selectedFile, {header : false, delimiter : ',', encoding : "utf8"});
  }

  getParseCsvFile() : Observable<any[] | NgxCSVParserError> {
    console.log(this.selectedFile);

    return this.parser.parse(this.selectedFile, {});      
  }
}
