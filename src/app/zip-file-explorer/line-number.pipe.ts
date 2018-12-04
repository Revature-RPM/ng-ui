import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineNumber'
})
export class LineNumberPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return this.splitMethod(value);
  }
  splitMethod(value){
    let lines = value.split("\n")
    let returnValue = ""
    for(let i = 0; i <lines.length;i++){
      returnValue +=  " "+(i+1).toString().padStart(3, ' ') +"   " + lines[i] + "\n"
    }
    return returnValue;
  }
}