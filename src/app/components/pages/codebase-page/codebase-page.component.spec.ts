import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodebasePageComponent } from './codebase-page.component';

describe('CodebasePageComponent', () => {
  let component: CodebasePageComponent;
  let fixture: ComponentFixture<CodebasePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodebasePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodebasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
