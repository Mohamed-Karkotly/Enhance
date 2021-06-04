import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpSidebarComponent } from './cp-sidebar.component';

describe('CpSidebarComponent', () => {
  let component: CpSidebarComponent;
  let fixture: ComponentFixture<CpSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
