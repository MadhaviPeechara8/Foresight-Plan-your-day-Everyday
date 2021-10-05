import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(placements: any[], searchTerm:string): any[] {

   
    if(!placements || !searchTerm){
      return placements;
    }
    else{
      return placements.filter(placeObj=>placeObj.itemTitle.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1 )
    }
  }

}
