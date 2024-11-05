import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GetApiComponent } from '../../services/get-api/get-api.component';
import { ProductData } from '../../types/product-api.type';
import { ProductCardDataModel } from '../../model/home-product.model';
import { CardType } from '../../types/card-data.type';
import { DataService } from '../../services/data.service';
import { PaginationComponent } from '../../services/pagination/pagination.component';
import { CacheComponent } from '../../services/chache';
import { FooterElementComponent } from '../../services/footerElementService';
import { APIFunctionCall } from '../../services/Api.function.call';
import { FooterNextComponent } from '../../services/footerIssue';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [NgClass],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
  providers: [GetApiComponent, FooterElementComponent],
})
export class MainContentComponent implements OnInit {
  constructor(
    private api: GetApiComponent,
    private dataService: DataService,
    private pagination: PaginationComponent,
    private footerFunction: FooterElementComponent,
    private apiCall: APIFunctionCall,
    public cache: CacheComponent
  ) {}
  products: ProductData[] = [];
  productCard: CardType[] = [];
  db: any;
  scrollprev: number = -1;
  scrollnext: number = -1;
  loader: boolean = false;
  dataInCache: number[] = [];
  async ngOnInit(): Promise<void> {
    console.log('issue6');
    this.getData(10, 0);

    this.apiCall.dataEmitter.subscribe({
      next: (value) => {
        console.log('issue1');
        this.getData(
          this.pagination.limit,
          this.pagination.limit * (value - 1)
        );
        this.pagination.currentPage = value;
      },
    });

    this.dataService.dataEmitter.subscribe({
      next: async (value) => {
        // console.log(value);
        //   this.productCard = [];
        //   const pageValue = value / 10;
        //     for (let i = 1; i <= pageValue; i++) {
        //         if (!this.dataInCache.includes(i)) {
        //             this.pagination.currentPage = i;
        //             await this.getDataAsync(10, (i - 1) * 10);
        //             // this.pagination.pagesInfo.set(i, this.productCard.slice());
        //         }
        //         this.productCard.push(...this.pagination.pagesInfo.get(i) as CardType[]);
        //         if (this.productCard.length % pageValue == 0) {
        //             this.pagination.currentPage++;
        //         }
        //     }
        //     this.pagination.limit = value;
        //     this.pagination.currentPage = 1;
        //     this.pagination.pagesInfo.clear();
        //     this.pagination.pagesInfo.set(1,this.productCard);
        //     this.footerFunction.updatePagination(1); // Update pagination UI if applicable
      },
    });

    const element = this.mainContent.nativeElement;
    element.scrollTop = 0;
  }

  getDataAsync(limit: number, offset: number): Promise<void> {
    return new Promise((resolve) => {
      this.getData(limit, offset);
      this.apiCall.dataEmitter.subscribe({
        next: () => {
          resolve();
        },
      });
    });
  }

  @ViewChild('mainContent', { static: true }) mainContent!: ElementRef;

  ngAfterViewInit(): void {
    this.mainContent.nativeElement.addEventListener(
      'scroll',
      this.onScroll.bind(this)
    );
  }

  onScroll(): void {
    setTimeout(() => {
      const element = this.mainContent.nativeElement;
      // console.log(element)
      // console.log(  element.scrollTop,'scroll top',element.clientHeight,'clientHeight',element.scrollHeight,'scroll height')
      if (this.db) {
        clearTimeout(this.db);
      }

      if (element.scrollHeight) {
        this.db = setTimeout(() => {
          let index: number = 0;

          let pageHeight: number = Math.floor(
            element.scrollHeight / this.dataInCache.length
          );
          // console.log("Page Height" +pageHeight)
          index = this.dataInCache.indexOf(this.pagination.currentPage);
          // console.log("index"+index)
          let prevBoundary: number = pageHeight * index;
          let nextBoundary: number = pageHeight * (index + 1);
          // console.log("Next boundary "+nextBoundary)
          // console.log("Scroll Top"+element.scrollTop)
          if (
            this.pagination.totalPages != this.pagination.currentPage &&
            element.scrollTop + element.clientHeight >=
            element.scrollHeight - 1
          ) {
            console.log('Infinte is Working');
            this.getData(
              this.pagination.limit,
              this.pagination.currentPage * this.pagination.limit
            );

            this.footerFunction.next();
           
          } else if (
            index < this.dataInCache.length &&
            nextBoundary < element.scrollTop + 105 &&
            !this.dataInCache.includes(this.pagination.currentPage + 1)
          ) {
            console.log(this.pagination.currentPage);
            console.log('next is working');
            this.getData(
              this.pagination.limit,
              this.pagination.limit * (this.pagination.currentPage + 1)
            );
            this.footerFunction.next();
          }
          else if (
            this.pagination.currentPage > 1 &&
            prevBoundary > element.scrollTop + element.clientHeight-100 &&
            !this.dataInCache.includes(this.pagination.currentPage - 1)
          ) {
            console.log(this.pagination.currentPage);
            console.log('previous is Working');
            console.trace();
            this.getData(
              this.pagination.limit,
              this.pagination.currentPage * this.pagination.limit
            );
            this.footerFunction.prev();
          }
        }, 200);
      }
    });
  }

  selectPageScroll() {
    console.log('selectPageScroll');
    const element = this.mainContent.nativeElement;
    let idx: number = this.dataInCache.indexOf(this.pagination.currentPage);
  
    element.scrollTop =
      (element.scrollHeight / this.pagination.pagesInfo.size) * idx;
  }

  getData(limit: number, skip: number) {
    if (this.cache.response.has(`limit=${limit}&skip=${skip}`)) {
      setTimeout(() => {
        this.selectPageScroll();
      });
    } else {
      this.api.getAllProduct(limit, skip).subscribe({
        next: (response) => {
          this.productCard = [];
          this.loader = true;
          let card = ProductCardDataModel.convertToCardType(response.products);
          if (!this.dataInCache.includes(this.pagination.currentPage)) {
            this.dataInCache.push(this.pagination.currentPage);
            this.dataInCache.sort();
          }
          this.pagination.pagesInfo.set(this.pagination.currentPage, card);
          // this.productCard.splice((this.pagination.currentPage-1)*10,0,...card);
          const sortedEntries = Array.from(
            this.pagination.pagesInfo.entries()
          ).sort((a, b) => a[0] - b[0]);

          this.pagination.pagesInfo = new Map<number, CardType[]>(
            sortedEntries
          );

          for (let [key, cardArray] of this.pagination.pagesInfo) {
            setTimeout(() => {
              this.productCard.push(...cardArray);
            });
          }

          this.cache.response.set(
            `limit=${limit}&skip=${skip}`,
            this.productCard
          );

          setTimeout(() => {
            this.selectPageScroll();
            setTimeout(() => {
              this.loader = false;
            }, 500);
          });
        },
      });
    }
  }
}
