import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSwitcherComponent } from './page-switcher.component';

describe('PageSwitcherComponent', () => {
  let component: PageSwitcherComponent;
  let fixture: ComponentFixture<PageSwitcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageSwitcherComponent]
    });
    fixture = TestBed.createComponent(PageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
