import { FileService } from './../../services/file.service';
import { Component } from '@angular/core';
import { CsvTableComponent } from '../../models/csv-table/csv-table.component';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-csv-panel-page',
  standalone: true,
  imports: [CsvTableComponent, RouterLink],
  templateUrl: './csv-panel-page.component.html',
  styleUrl: './csv-panel-page.component.scss'
})
export class CsvPanelPageComponent {
  public data: any[] = [];
  public fileSaved = false;
  constructor(private fileService : FileService) {
    
  }
  
  public onFileSelected(event: Event) {
    const selectedElement = event.target as HTMLInputElement;

    if (selectedElement) {
      const selectedFile = selectedElement.files![0];
      const reader = new FileReader(); 
    
      reader.onload = (e: any) => {
        const fileContent = e.target.result; 
      };
    
      reader.readAsText(selectedFile);  

      this.fileService.setFile(selectedFile);
      this.fileService.getCsvAsArray()
      .subscribe({
        next: (data) => {
          console.log(data)
          this.data = data as any;
        },
        error: (error: NgxCSVParserError) => {
          this.data = []
          console.log('Error', error);
        }
      });
    }
  }
  public onSave() {
    this.fileService.saveFile(this.fileService.getFile())
    .then((result) => {
      if (result) {
        this.fileSaved = true; 
        setTimeout(() => {
          this.fileSaved = false;
        }, 3000);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
