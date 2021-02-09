import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionshomeComponent } from './optionshome.component';

describe('OptionshomeComponent', () => {
  let component: OptionshomeComponent;
  let fixture: ComponentFixture<OptionshomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionshomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
