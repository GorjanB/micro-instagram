import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PhotosAppComponent } from './photos-app.component';
import { HeaderComponent } from './header/header-component';
import { PhotosListComponent } from './photos/photos-list/photos-list.component';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { PhotoService } from './photos/shared/photo.service';
import { PhotosListResolver } from './photos/photos-list/photos-list-resolver.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollService } from './services/scroll.service';
import { PhotoDetailsResolver } from './photos/photo-details/photo-details-resolver.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'



@NgModule({
  declarations: [
    HeaderComponent,
    PhotosAppComponent,
    PhotosListComponent,
    PhotoDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    PhotoService,
    ScrollService,
    PhotosListResolver,
    PhotoDetailsResolver
  ],
  bootstrap: [PhotosAppComponent]
})
export class AppModule { }
