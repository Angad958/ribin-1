import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  constructor() { }

  consoleLog(label:string, data:any){
    console.log(label, data)

  }
}
