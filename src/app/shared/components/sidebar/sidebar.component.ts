import { Component } from '@angular/core';
import { GifService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifService){

  }
  get tags(){
    return this.gifsService.tagsHistory;
  }

  searchTag(tag: string){
    this.gifsService.searchTag(tag);
  }
}
