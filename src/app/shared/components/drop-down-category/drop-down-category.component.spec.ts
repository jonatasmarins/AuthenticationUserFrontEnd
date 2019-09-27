import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownCategoryComponent } from './drop-down-category.component';

describe('DropDownCategoryComponent', () => {
  let component: DropDownCategoryComponent;
  let fixture: ComponentFixture<DropDownCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
