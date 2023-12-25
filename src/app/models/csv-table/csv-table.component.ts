import { Component, Input } from '@angular/core';
import { CsvParser} from 'csv-parser';
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

  constructor(public fileService : FileService) {
  }

}
