import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paddTxt',
})
export class PaddTxtPipe implements PipeTransform {
  transform(value: string): string {
    return value.slice(0, 4)+"...";
  }
}
