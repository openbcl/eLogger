import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorClass'
})
export class ColorPipe implements PipeTransform {

  transform(color: string): string {
    switch(color) {
      case null:
        return '';
      default:
        return `bg-${color}-500 hover:bg-${color}-600`;
    }
  }

}
