import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommunitiesComponent } from './admin-communities.component';

describe('AdminCommunitiesComponent', () => {
  let component: AdminCommunitiesComponent;
  let fixture: ComponentFixture<AdminCommunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommunitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
