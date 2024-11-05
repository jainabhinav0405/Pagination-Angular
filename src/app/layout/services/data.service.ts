import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable(
    
)
export class DataService {
    public dataEmitter = new Subject<number>();

    raiseDataEmitter(data: number){
        console.log("inside rasie emmiter")
        this.dataEmitter.next(data);
    }
}