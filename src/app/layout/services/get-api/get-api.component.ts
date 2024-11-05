import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { ProductApiResponse } from '../../types/product-api.type';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'  
})
export class GetApiComponent {
  constructor(private http:HttpClient) { }  
  getAllProduct(limit:number,skip:number){
    return this.http.get<ProductApiResponse>(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`) 
  }

}
