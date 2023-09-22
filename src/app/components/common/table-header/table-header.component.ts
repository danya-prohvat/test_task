import { Component, Input } from '@angular/core';
import { IDetails } from '@types';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent {
  constructor() {}

  @Input() details: IDetails = []
}
