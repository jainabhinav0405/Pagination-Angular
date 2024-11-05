import { Component, ElementRef, inject, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { CacheComponent } from './chache';
@Component({
  selector: 'app-footer-element-component',
  standalone: true,
  imports: [FormsModule, NgClass],
  providers: [CacheComponent],
  template: ''
})
  
export class FooterElementComponent{
    constructor(private pagination:PaginationComponent,private cache:CacheComponent){}
    
    next() {
      // console.log("next ho rh hia footerService se")
      // this.pagination.currentPage = page;
        if (this.pagination.currentPage < this.pagination.totalPages) {
          this.pagination.currentPage++;
          const activePage = document.querySelector(".active-page");
          const currentPageButton = document.querySelector(`.button${this.pagination.currentPage}`);
          if (currentPageButton && activePage) {
            activePage.classList.remove("active-page");
            currentPageButton.classList.add("active-page");
          }
          this.updatePagination(this.pagination.currentPage);
        }
      }
      
      prev() {
        if (this.pagination.currentPage > 1) {
          this.pagination.currentPage--;
          const activePage = document.querySelector(".active-page");
          const currentPageButton = document.querySelector(`.button${this.pagination.currentPage}`);
          if (activePage && currentPageButton) {
            activePage.classList.remove("active-page");
            currentPageButton.classList.add("active-page");
          }
        }
        this.updatePagination(this.pagination.currentPage)
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
      }
        
      
}