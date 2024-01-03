import { Component, Input } from '@angular/core';
import { IFile } from '../../entity/file';
import { FileService } from '../../services/file.service';
import { Router } from '@angular/router';
import { retryWhen } from 'rxjs';

@Component({
  selector: 'app-file-item',
  standalone: true,
  imports: [],
  templateUrl: './file-item.component.html',
  styleUrl: './file-item.component.scss'
})
export class FileItemComponent {
  @Input() file : IFile = {} as IFile;

  constructor(public fileService : FileService,
    public router : Router) {
  }

  showFile() {
    this.fileService.getFile(this.file.id)
    .then((result) => {
      const blob = new Blob([result], { type: 'application/octet-stream' });
      const file = new File([blob], this.file.name, { type: 'text/csv' });
      
      this.fileService.setCurrentFile(file);
      this.router.navigate(['/csv-panel']);
    })
    .catch((error) => {
      console.error(error);
    });
  }

}
