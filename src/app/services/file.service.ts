import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { IFile } from '../entity/file';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly BASE_URL = 'http://localhost:5149/api'; 
  private selectedFile : File;
  private parser : NgxCsvParser = new NgxCsvParser();
  private parseCsvFile : Subject<Observable<any[] | NgxCSVParserError>> = new Subject<Observable<any[] | NgxCSVParserError>>();

  constructor(private httpClient : HttpClient) { 
    this.selectedFile = new File([], '');
  }

  public setFile(file : File) {
    this.selectedFile = file;
    this.parseCsvFile.next(this.getCsvAsArray());
  }

  public getFile() : File {
    return this.selectedFile
  }

  public getCsvAsArray() {
    return this.parser.parse(this.selectedFile, {header : false, delimiter : ',', encoding : "utf8"});
  }

  public getParseCsvFileSubject() : Subject<Observable<any[] | NgxCSVParserError>> {
    return this.parseCsvFile;      
  }

  public saveFile(file : File) {
    const formData = new FormData();
    formData.append('file', file);

    return new Promise<boolean> ((resolve, reject) => {
      this.httpClient.post(this.BASE_URL + "/File/Create", formData)
      .pipe(
        catchError(error => {
          if (error.status === 403 || error.status === 400) {
            resolve(false);
          }
          return throwError(error);
        }),
        map((reuslt) => {
          return true;
        })
      )
      .subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  public getAllFiles() {
    return new Promise<IFile[]> ((resolve, reject) => {
      this.httpClient.get<IFile[]>(this.BASE_URL + "/File/GetFiles")
      .pipe(
        catchError(error => {
          return throwError(error);
        }),
        map((reuslt) => {
          return reuslt;
        })
      )
      .subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }
}
