import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoredSquaresComponent } from './colored-squares.component';

describe('ColoredSquaresComponent', () => {
  let component: ColoredSquaresComponent;
  let fixture: ComponentFixture<ColoredSquaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColoredSquaresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColoredSquaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
