import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { SharedModule } from './shared/shared.module';

import { BlockUIModule } from 'ng-block-ui';
import { BlockUIInstanceService } from 'ng-block-ui/lib/services/block-ui-instance.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BlockUIModule,
        AppRoutingModule,
        SharedModule
      ],
      declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent
      ],
      providers: [
        BlockUIInstanceService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
