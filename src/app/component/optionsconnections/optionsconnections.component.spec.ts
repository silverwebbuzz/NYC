import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsconnectionsComponent } from './optionsconnections.component';

describe('OptionsconnectionsComponent', () => {
  let component: OptionsconnectionsComponent;
  let fixture: ComponentFixture<OptionsconnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsconnectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsconnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
