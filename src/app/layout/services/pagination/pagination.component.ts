import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardType } from '../../types/card-data.type';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  providers:[]
})
export class PaginationComponent implements OnInit{
  limit:number = 10;
  skip:number = 10;
  totalProducts: number = 194;
  currentPage: number = 1;
  totalPages:number = Math.floor(194/this.limit);
  startPage:number=0;
  endPage:number = 0;
  pagesInfo = new Map<number,CardType[]>();
  totalPagesArray:number[] = [];
 
  constructor() { }
  
  
  ngOnInit(): void {
    
  }
  setPagination(){
    this.startPage = Math.max(1, this.currentPage - Math.floor(5 / 2));
    this.endPage = Math.min(this.totalPages, this.startPage + 4);
    return Array.from({ length: this.endPage - this.startPage + 1 }, (_, i) => i + this.startPage);
  }
  
  
  
  // onScroll(){
  //   const scroller = document.querySelector(".main-content");
  //   if(scroller){   
  //   //   console.log("Scroller Top "+scroller.scrollTop);
  //   //   console.log("client height"+scroller.clientHeight);
  //   //   console.log("Scroller Height"+scroller.scrollHeight);
  //   // }
  //   // scroller.scrollTop = scroller.scrollHeight/this.pagesInfo.size*this.currentPage;

  //   }
  // }

}
