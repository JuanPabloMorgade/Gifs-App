import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'shared-lazyimage',
  templateUrl: './lazyimage.component.html'
})
export class LazyimageComponent implements OnInit{

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if(!this.url) throw new Error('La propiedad de la URL es Requerida');
  }

  onLoad(){
    setTimeout(() =>{
      this.hasLoaded = true;
    },1000);
  }

}
