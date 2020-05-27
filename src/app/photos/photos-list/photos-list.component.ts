import { Component, OnInit } from '@angular/core';
import { IPhoto } from '../shared/photo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ScrollService } from 'src/app/services/scroll.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.css']
})
export class PhotosListComponent implements OnInit {

  public photos:IPhoto[]
  public itemCount: number

  private ngUnsubscribe = new Subject()
  private thumbnailWidth = 150
  private thumbnailHeight = 150
  private slack = 4

  constructor(private scrollService: ScrollService, 
    private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    //this.itemCount = Math.ceil((window.innerWidth * window.innerHeight) / 150)
    this.itemCount = (Math.ceil((window.innerWidth / this.thumbnailWidth * (window.innerHeight / this.thumbnailHeight)))) + this.slack
    this.photos = this.route.snapshot.data['photos']
    
    this.scrollService.onScrolledDown$.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => this.fetchMoreItems())
  }

  private fetchMoreItems(){
    this.itemCount += (Math.ceil((window.innerWidth / this.thumbnailWidth) * (window.innerHeight / this.thumbnailHeight))) + this.slack
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }

  onClick(id:number){
    this.router.navigate(['/photos/'+id])
    console.log('clicked')
  }

}
