import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { IFile } from '../entity/file';
import { TagContentType } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly BASE_URL = 'http://localhost:5149/api'; 
  private selectedFile : File;
  private parser : NgxCsvParser = new NgxCsvParser();
  private parseCsvFile : BehaviorSubject<Observable<any[] | NgxCSVParserError>> = 
    new BehaviorSubject<Observable<any[] | NgxCSVParserError>>(new Observable<any[] | NgxCSVParserError>());

  constructor(private httpClient : HttpClient) { 
    this.selectedFile = new File([], '');
  }

  public setCurrentFile(file : File) {
    console.log(file);
    this.selectedFile = file;
    this.parseCsvFile.next(this.getCsvAsArray());
  }

  public getCurrentFile() : File {
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
      this.httpClient.post<File>(this.BASE_URL + "/File/Create", formData)
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

  public getFile(id : string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/html',
        'Content-Type': 'text/plain; charset=utf-8',
      }),
      responseType: 'blob'
    };

    

    return new Promise<Blob> ((resolve, reject) => {
      this.httpClient.get<Blob>(this.BASE_URL + "/File/GetFile", {
        params : {id : id},
        responseType : 'blob' as 'json',
      })
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
