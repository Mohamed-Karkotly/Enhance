import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatedCommunitiesComponent } from './participated-communities.component';

describe('ParticipatedCommunitiesComponent', () => {
  let component: ParticipatedCommunitiesComponent;
  let fixture: ComponentFixture<ParticipatedCommunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipatedCommunitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipatedCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
