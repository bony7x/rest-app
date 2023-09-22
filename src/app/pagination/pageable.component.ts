import {Component} from '@angular/core';
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-pagination',
  templateUrl: './pageable.component.html',
  standalone: true,
  imports: [NgbPaginationModule],
  styleUrls: ['./pageable.component.css']
})
export class Pageable {
  pageNumber:number
  pageSize: number
  totalCount: number
}
