import {TestBed} from '@angular/core/testing';

import {SnackbarService} from './snackbar.service';
import { MatSnackBarModule } from '@angular/material';

fdescribe('SnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ MatSnackBarModule ],
  }));

  it('should be created', () => {
    const service: SnackbarService = TestBed.get(SnackbarService);
    expect(service).toBeTruthy();
  });
});
