import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable(
    
)
export class FooterNextComponent {
    public dataEmitter = new Subject<boolean>();

    raiseDataEmitter(data: boolean){
        console.log("inside rasie emmiter")
        this.dataEmitter.next(data);
    }
}