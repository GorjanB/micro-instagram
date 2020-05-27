import { Routes } from '@angular/router'
import { PhotosListComponent } from './photos/photos-list/photos-list.component'
import { PhotosListResolver } from './photos/photos-list/photos-list-resolver.service'
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component'
import { PhotoDetailsResolver } from './photos/photo-details/photo-details-resolver.service'


export const appRoutes:Routes = [
    { path: 'photos', component: PhotosListComponent,
             resolve:{photos:PhotosListResolver}},
    { path: 'photos/:id', component: PhotoDetailsComponent,
                     resolve:{photos:PhotoDetailsResolver}},
    { path: '', redirectTo:'/photos', pathMatch: 'full'},
    { path: '**', redirectTo:'/photos', pathMatch: 'full'}
]