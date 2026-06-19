import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LugaresComponent } from './lugares';

describe('LugaresComponent', () => {
  let component: LugaresComponent;
  let fixture: ComponentFixture<LugaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LugaresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LugaresComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
