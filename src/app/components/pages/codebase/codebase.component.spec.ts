import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodebaseComponent } from './codebase.component';
import { HighlightModule } from 'ngx-highlightjs';
import { hljsLanguages } from 'src/app/app.module';
import { MatIconModule, MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NgMetaService } from 'ngmeta';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CodebaseComponent', () => {
  let component: CodebaseComponent;
  let fixture: ComponentFixture<CodebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodebaseComponent ],
      imports: [ MatIconModule, MatCardModule, RouterTestingModule,
        HttpClientTestingModule, HighlightModule.forRoot({ languages: hljsLanguages }) ],
      providers: [ NgMetaService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});