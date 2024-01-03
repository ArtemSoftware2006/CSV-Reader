import { Component, Input } from '@angular/core';
import { FileService } from '../../services/file.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-csv-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './csv-table.component.html',
  styleUrl: './csv-table.component.scss'
})
export class CsvTableComponent {

  @Input() public data? : any[any[string]];

  currentFileName : string = '';

  constructor(public fileService : FileService) {
    // fileService.getParseCsvFileSubject().subscribe({
    //   next: (data) => {
    //     data.subscribe(data => {
    //       this.data = data
    //       this.currentFileName = fileService.getCurrentFile()?.name || '';
    //     });
    //   }
    // })
  }

  ngOnInit(): void {
    this.fileService.getParseCsvFileSubject().subscribe({
      next: (data) => {
        data.subscribe(data => {
          this.data = data
          this.currentFileName = this.fileService.getCurrentFile()?.name || '';
        });
      }
    })
  }
}
