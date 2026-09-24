import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthorizedPage } from './un-authorized-page';

describe('UnAuthorizedPage', () => {
  let component: UnAuthorizedPage;
  let fixture: ComponentFixture<UnAuthorizedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnAuthorizedPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UnAuthorizedPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
