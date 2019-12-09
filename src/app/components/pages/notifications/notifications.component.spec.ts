import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule, MatIconModule, MatMenuModule, MatToolbarModule, MatExpansionModule, MatListModule, MatBadgeModule, MatFormFieldModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MockUserService } from 'src/app/mocks/mock-user-service';
import { By } from '@angular/platform-browser';

import { NotificationsComponent } from './notifications.component';
import { PipeModule } from 'src/pipes/pipe.module';

describe('NotificationsComponent', () => {
    let component: NotificationsComponent;
    let fixture: ComponentFixture<NotificationsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationsComponent],
            imports: [MatSidenavModule, MatIconModule, MatMenuModule,
                MatToolbarModule, MatExpansionModule, MatFormFieldModule,
                HttpClientTestingModule, NoopAnimationsModule, MatListModule, MatBadgeModule,
                RouterTestingModule, PipeModule],
            providers: [{ provide: UserService, useClass: MockUserService }],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
