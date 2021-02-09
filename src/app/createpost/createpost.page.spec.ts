import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepostPage } from './createpost.page';

describe('CreatepostPage', () => {
  let component: CreatepostPage;
  let fixture: ComponentFixture<CreatepostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatepostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
