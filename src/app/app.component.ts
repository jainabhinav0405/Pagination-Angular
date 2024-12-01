import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/components/footer/footer.component';
import { MainContentComponent } from './layout/components/main-content/main-content.component';
import { NavigationComponent } from './layout/components/navigation/navigation.component';
import { PaginationComponent } from './layout/services/pagination/pagination.component';
import { DataService } from './layout/services/data.service';
import { CacheComponent } from './layout/services/chache';
import { APIFunctionCall } from './layout/services/Api.function.call';
import { FooterNextComponent } from './layout/services/footerIssue';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavigationComponent,MainContentComponent,PaginationComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[DataService,CacheComponent,APIFunctionCall,FooterNextComponent,PaginationComponent]
})
export class AppComponent {
  title = 'assisment';
  

}
