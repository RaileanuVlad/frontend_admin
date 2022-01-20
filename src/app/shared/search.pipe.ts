import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (items.length === 0) { return items; }

    if (filter) {
      const filterKeys = Object.keys(filter);

      return items.filter(item => {
        return filterKeys.some((keyName) => {
          return new RegExp(filter[keyName], 'gi').test(item[keyName]);
        });
      });

    } else {
      return items;
    }
  }

}
