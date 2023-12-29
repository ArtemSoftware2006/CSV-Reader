import { Injectable } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private selectedFile : File;
  private parser : NgxCsvParser = new NgxCsvParser();
  private parseCsvFile : Subject<Observable<any[] | NgxCSVParserError>> = new Subject<Observable<any[] | NgxCSVParserError>>();

  constructor() { 
    this.selectedFile = new File([], '');
  }

  setFile(file : File) {
    this.selectedFile = file;
    this.parseCsvFile.next(this.getCsvAsArray());
  }

  getFile() : File {
    return this.selectedFile
  }

  getCsvAsArray() {
    return this.parser.parse(this.selectedFile, {header : false, delimiter : ',', encoding : "utf8"});
  }

  getParseCsvFileSubject() : Subject<Observable<any[] | NgxCSVParserError>> {
    return this.parseCsvFile;      
  }
}
