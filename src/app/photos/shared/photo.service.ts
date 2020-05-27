import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { IPhoto } from './photo.model';
import { photosUrl } from './info';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PhotoService {
    constructor(private http: HttpClient){}

    getPhotos():Observable<IPhoto[]> {
        return this.http.get<IPhoto[]>(photosUrl)
        .pipe(catchError(this.handleError<IPhoto[]>('getPhotos')))
    }

    editPhoto(photo:IPhoto, oldId:number){
        let options = { headers: new HttpHeaders({'Content-Type' : 'application/json'})}
        return this.http.patch<IPhoto>(photosUrl+'/'+oldId, photo, options)
          
    }

    deletePhoto(id:number){
        return this.http.delete(photosUrl+'/'+id)
        .pipe(catchError(this.handleError('deletePhoto')))
    }

    private handleError<T> (operation = 'operation', result?: T){
        return (error: any): Observable<T> => {
            console.error(error)
            return of(result as T)
        }
    }
}

