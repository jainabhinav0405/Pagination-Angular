import { Injectable } from "@angular/core";
import { CardType } from "../types/card-data.type";
import { Caching } from "../types/caching.type";



@Injectable(
    
)
export class CacheComponent{
    response = new Map<string, CardType[]>();
}


