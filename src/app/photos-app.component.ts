import { Component } from '@angular/core';

@Component({
    selector: 'photos-app',
    template:`
    <header-app></header-app>
    <router-outlet></router-outlet>
    `
})
export class PhotosAppComponent {}