import { TestBed, async, inject } from '@angular/core/testing';

import { MyprojectViewGuard } from './myproject-view.guard';

describe('MyprojectViewGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyprojectViewGuard]
    });
  });

  it('should ...', inject([MyprojectViewGuard], (guard: MyprojectViewGuard) => {
    expect(guard).toBeTruthy();
  }));
});
