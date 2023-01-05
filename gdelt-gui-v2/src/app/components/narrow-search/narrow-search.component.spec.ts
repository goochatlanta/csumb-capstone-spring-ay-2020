import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarrowSearchComponent } from './narrow-search.component';

describe('NarrowSearchComponent', () => {
  let component: NarrowSearchComponent;
  let fixture: ComponentFixture<NarrowSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NarrowSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NarrowSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
