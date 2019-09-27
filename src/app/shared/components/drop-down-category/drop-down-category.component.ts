import { FormControl, FormGroup, FormBuilder, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor } from '@angular/forms';
import { Category } from './../../models/category';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from './../../service/category.service';
import { Component, OnInit, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-drop-down-category',
  templateUrl: './drop-down-category.component.html',
  styleUrls: ['./drop-down-category.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DropDownCategoryComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DropDownCategoryComponent), multi: true }
  ]
})
export class DropDownCategoryComponent implements ControlValueAccessor, OnChanges, OnInit {

  @Input() FormValue = '';
  categories: Category[] = [];
  formCategories: FormGroup;

  propagateChange: any = () => {};
  validateFn: any = () => {};

  writeValue(obj: any): void {
    if (obj) {
      this.FormValue = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.counterRangeMax || changes.counterRangeMin) {
      this.propagateChange(this.FormValue);
    }
  }

  constructor(
    private categoryService: CategoryService,
    private spinnerService: NgxSpinnerService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
    this.getCategories();
    console.log(this.FormValue);
  }

  createForm() {
    this.formCategories = this.fb.group({
      category: new FormControl()
    });
  }

  getCategories() {
    this.spinnerService.show();
    this.categoryService.getCategories()
      .subscribe((result) => {
        this.categories = result;
        this.spinnerService.hide();
      });
  }

  change($event) {
    this.FormValue = $event.srcElement.value;
    this.propagateChange(this.FormValue);
  }

  // addOptionSelect() {
  //   const categorySelect = new Category();
  //   categorySelect.id = 0;
  //   categorySelect.title = 'Selecione';
  // }
}
