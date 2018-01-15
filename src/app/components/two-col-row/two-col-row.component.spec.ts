import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoColRowComponent } from './two-col-row.component';

describe('TwoColRowComponent', () => {
  let component: TwoColRowComponent;
  let fixture: ComponentFixture<TwoColRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoColRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoColRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
