import { Component, Input } from '@angular/core';
import { IFile } from '../../entity/file';

@Component({
  selector: 'app-file-item',
  standalone: true,
  imports: [],
  templateUrl: './file-item.component.html',
  styleUrl: './file-item.component.scss'
})
export class FileItemComponent {
  @Input() file : IFile = {} as IFile;
}
