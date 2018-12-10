import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatJumbotronModule } from '@angular-material-extensions/jumbotron';
import { NgMetaModule } from 'ngmeta';

import { AppRoutingModule } from './app-routing.module';
import { ProjectModule } from './project/project.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { environment } from 'src/environments/environment';
import { jwtOptionsFactory } from 'src/app/core/services/jwtInterceptor.interceptor';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    HttpClientModule,
    ProjectModule,
    MatJumbotronModule.forRoot(),
    NgMetaModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory 
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
