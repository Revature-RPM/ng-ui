import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ProjectService } from './services/project.service';
import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { jwtinterceptor } from 'src/app/core/services/jwtInterceptor.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ProjectService,
    UserService,
    {    provide: HTTP_INTERCEPTORS,
      useClass: jwtinterceptor,
      multi: true
  
     }, 
    
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule
    };
  }
}
