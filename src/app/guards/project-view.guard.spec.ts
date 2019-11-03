import { TestBed, async, inject } from '@angular/core/testing';

import { ProjectViewGuard } from './project-view.guard';

describe('ProjectViewGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectViewGuard]
    });
  });

  xit('should ...', inject([ProjectViewGuard], (guard: ProjectViewGuard) => {
    expect(guard).toBeTruthy();
  }));
});
