import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepertemenComponent } from './add-depertemen.component';

describe('AddDepertemenComponent', () => {
  let component: AddDepertemenComponent;
  let fixture: ComponentFixture<AddDepertemenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDepertemenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepertemenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
