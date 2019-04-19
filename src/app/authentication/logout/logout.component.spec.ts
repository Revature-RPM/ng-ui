import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule} from '../../app.module';


import { LogoutComponent } from './logout.component';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { AuthenticationRoutingModule } from '../authentication-routing.module';

/**
 * This component cannot be tested because there is no implementation. All variables are global scoped. 
 * Future iterations could consider restructuring this component.
 * @author Gabriel Zapata | Fadi Alzoubi | Slavik Gleanco | Alex Johnson | Edward Bechtold
 */

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        AppModule,
        AuthenticationModule,
        AuthenticationRoutingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
