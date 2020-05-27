import { Resolve } from '@angular/router';
import { PhotoService } from '../shared/photo.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PhotoDetailsResolver implements Resolve<any> {

    constructor(private photoService:PhotoService){}

    resolve() {
        return this.photoService.getPhotos()
    }
}