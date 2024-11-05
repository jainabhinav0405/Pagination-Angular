import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable(
    
)
export class APIFunctionCall {
    public dataEmitter = new Subject<number>();

    raiseDataEmitter(data: number){
        console.log("inside rasie emmiter Api")
        this.dataEmitter.next(data);
    }
}