import {Component} from '@angular/core';
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [NgbPaginationModule],
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  page:number
  pageSize: number
  totalCount: number
}
