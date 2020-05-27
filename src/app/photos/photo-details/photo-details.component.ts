import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPhoto } from '../shared/photo.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../shared/photo.service';


@Component({
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit, AfterViewInit {

  photo: IPhoto
  photos: IPhoto[]
  @ViewChild('img') elementView: ElementRef;
  photoHeight:number
  photoWidth:number

  editMode :boolean = false
  deleteMode: boolean = false

  duplicatePhotoIdError: boolean = false
  faildToSaveError: boolean = false
  isLoading: boolean = false

  title:FormControl
  photoId:FormControl
  albumId:FormControl

  profileForm: FormGroup

  constructor(private route:ActivatedRoute, private router:Router,
    private photoService:PhotoService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id:number = +params.get("id")
      this.photos = this.route.snapshot?.data['photos']
      this.photo = this.findPhoto(id)

      this.title = new FormControl(this.photo.title, [Validators.required])
      this.photoId = new FormControl(this.photo.id, [Validators.required,Validators.pattern('^[0-9]*$'), Validators.maxLength(8)])
      this.albumId = new FormControl(this.photo.albumId, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(8)])
      this.profileForm = new FormGroup({
      title: this.title,
      photoId: this.photoId,
      albumId: this.albumId
    })
    })

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.photoHeight = this.elementView.nativeElement.offsetHeight
      this.photoWidth = this.elementView.nativeElement.offsetWidth
    });
  }

  private findPhoto(id:number):IPhoto{
    return this.photos.filter( x => x.id == id)[0]
  }

  private photoIdIsUnique(id:number):boolean{
    let index = this.photos.indexOf(this.photo,0)
    if(index > -1){ this.photos.splice(index, 1) }
    return this.photos.filter( x => x.id == id)[0] ? false : true
  }

  editClicked(){
    this.deleteMode = false
    this.editMode = true
  }

  deleteClicked() {
    this.editMode = false
    this.deleteMode = true
  }

  saveProfile(formValues){
    if (this.profileForm.valid) {

      this.resetErros()
      if(!this.photoIdIsUnique(formValues.photoId)){
        this.duplicatePhotoIdError = true
        return
      }

      this.isLoading = true
      this.photoService.editPhoto(formValues, this.photo.id).subscribe(
        (res) => {
        this.isLoading = false
        this.photo.title=formValues.title
        this.photo.id = formValues.photoId
        this.photo.albumId = formValues.albumId
        this.editMode = false
        },
        (err) => {
          this.isLoading = false
          this.faildToSaveError = true
          this.editMode = true
        }
      )
      
    }
  }

  deletePhoto(){
    this.isLoading = true
    this.photoService.deletePhoto(this.photo.id).subscribe(() =>{
      this.isLoading = false
      console.log('deleted')
      this.router.navigate(['/photos'])
    })
  }

  private resetErros(){
    this.duplicatePhotoIdError = false
    this.faildToSaveError = false
  }

}
