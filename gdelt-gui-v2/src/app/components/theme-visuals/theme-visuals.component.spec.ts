import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeVisualsComponent } from './theme-visuals.component';

describe('ThemeVisualsComponent', () => {
  let component: ThemeVisualsComponent;
  let fixture: ComponentFixture<ThemeVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
