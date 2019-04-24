import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRkapComponent } from './input-rkap.component';

describe('InputRkapComponent', () => {
  let component: InputRkapComponent;
  let fixture: ComponentFixture<InputRkapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputRkapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRkapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
