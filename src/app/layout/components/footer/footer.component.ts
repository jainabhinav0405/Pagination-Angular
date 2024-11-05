import { Component, ElementRef, inject, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PaginationComponent } from '../../services/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { NgClass } from '@angular/common';
import { CardType } from '../../types/card-data.type';
import { APIFunctionCall } from '../../services/Api.function.call';
import { FooterNextComponent } from '../../services/footerIssue';



@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  imports: [FormsModule, NgClass],
  providers:[]
})
export class FooterComponent implements OnChanges,OnInit{
  @ViewChild('paginationContainer', { static: true }) paginationContainer!: ElementRef;
  currentPage: number = 1;
  offset: number = 10;
  totalPagesArray: number[] = [];

  constructor(
    private pagination: PaginationComponent,
    private dataService: DataService,
    private footer: FooterNextComponent,
    private apiCall: APIFunctionCall
  ) {}

  

  @ViewChild('buttonsContainer', { static: true }) buttonsContainer!: ElementRef<HTMLElement>;

  // Method to scroll the container based on the current page
  scrollToCurrentPage(): void {
    const pageLinks = this.paginationContainer.nativeElement.querySelectorAll('.pagination a') as NodeListOf<HTMLElement>;

    if (pageLinks.length > 0) {
      const linkWidth = pageLinks[0].offsetWidth;
      const scrollPosition = (this.currentPage - 1) * linkWidth;

      this.buttonsContainer.nativeElement.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }
  
  ngOnInit(): void {
    this.footer.dataEmitter.subscribe({
      next:(value)=>{
        if(value){
          this.next();
        }
      }
    })
    
    this.totalPagesArray = [...Array(this.pagination.totalPages).keys()].map(i => i + 1);
    this.updatePagination(this.pagination.currentPage);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.totalPagesArray = [...Array(this.pagination.totalPages).keys()].map(i => i + 1);
    
    this.updatePagination(this.pagination.currentPage);
  }
  adjustPaginationScroll(): void {
    const paginationContainer = this.paginationContainer.nativeElement;
    const pageWidth = paginationContainer.scrollWidth / this.pagination.totalPages;
    const targetPosition = pageWidth * this.pagination.currentPage;
    const leftScroll = targetPosition - paginationContainer.clientWidth;
    paginationContainer.scrollLeft = leftScroll;
  }
  next() {
    console.log("next ho rh hia footer se")
    if (this.pagination.currentPage < this.pagination.totalPages) {
      this.pagination.currentPage+=1;
      const activePage = document.querySelector(".active-page");
      const currentPageButton = document.querySelector(`.button${this.pagination.currentPage}`);
      if (currentPageButton && activePage) {
        activePage.classList.remove("active-page");
        currentPageButton.classList.add("active-page");
      }
      this.apiCall.raiseDataEmitter(this.pagination.currentPage);
      this.updatePagination(this.pagination.currentPage);
    }
    this.adjustPaginationScroll()
  }
  prev() {
    if (this.pagination.currentPage > 1) {
      this.pagination.currentPage-=1;
      const activePage = document.querySelector(".active-page");
      const currentPageButton = document.querySelector(`.button${this.pagination.currentPage}`);
      if (activePage && currentPageButton) {
        activePage.classList.remove("active-page");
        currentPageButton.classList.add("active-page");
      }
      
          const scroller = document.querySelector(".main-content");
          if(scroller){  
            scroller.scrollTop = 560*40*5/2;
          }
        
        
      }
      this.adjustPaginationScroll()
    }


  updatePagination(currentPage: number) {
      // console.log(currentPage);
      this.pagination.currentPage = currentPage;
      const prevButton = document.querySelector('.prev');
      const nextButton = document.querySelector('.next');

      if (prevButton && nextButton) {
          if (currentPage === 1) {
              prevButton.classList.add('disable');
          } else {
              prevButton.classList.remove('disable');
          }

          if (this.pagination.currentPage >= this.pagination.totalPages) {
              nextButton.classList.add('disable');
          } else {
              nextButton.classList.remove('disable');
          }
      }
      this.adjustPaginationScroll();
      
  }
  updateOffset(){
    console.log("updation working")
    this.dataService.dataEmitter.next(this.offset)
    // this.updatePagination(this.pagination.currentPage);
    
    this.pagination.totalPages  = Math.floor(194/this.offset);
    this.totalPagesArray = [...Array(this.pagination.totalPages).keys()].map(i => i + 1);
    this.pagination.currentPage = 1;
    const activePage = document.querySelector(".active-page");
    if(activePage){
      // console.log("got page")
      activePage.classList.remove("active-page");
    }
    const pageNumber = document.querySelector(`.button1`)
    if (pageNumber) {
      pageNumber.classList.add("active-page");
    }
    this.adjustPaginationScroll();
  }
  selectPage(page:number) {
    console.log(page)
    const activePage = document.querySelector(".active-page");
    if(activePage){
      // console.log("got page")
      activePage.classList.remove("active-page");
    }
    const pageNumber = document.querySelector(`.button${page}`)
    if (pageNumber) {
      pageNumber.classList.add("active-page");
    }
    this.apiCall.raiseDataEmitter(page);

    this.updatePagination(page);
    this.adjustPaginationScroll()
  }
  
}
