import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';
import { IFile } from '../../entity/file';
import { NgFor } from '@angular/common';
import { FileItemComponent } from '../../models/file-item/file-item.component';

@Component({
  selector: 'app-all-files-page',
  standalone: true,
  imports: [NgFor, FileItemComponent],
  templateUrl: './all-files-page.component.html',
  styleUrl: './all-files-page.component.scss'
})
export class AllFilesPageComponent {
  public files : IFile[] = [];
  constructor(public fileService : FileService) 
  {}

  ngOnInit(): void {
    this.fileService.getAllFiles()
    .then((result) => {
      this.files = result;
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
