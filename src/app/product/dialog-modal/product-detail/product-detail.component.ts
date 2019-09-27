import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductModelRequest } from '../../models/product-model-request';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() titleDialog;
  @Input() productEdit: ProductModelRequest;
  @Input() isUpdate = false;

  teste = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastService: ToastService,
    private spinner: NgxSpinnerService,
    public activeModal: NgbActiveModal
  ) { }

  formProduct: FormGroup;

  ngOnInit() {
    this.createForm();
    this.getInformation();
  }

  //#region  Gets and Setters

  get form() {
    return this.formProduct;
  }

  get title() {
    return this.form.get('title').value;
  }

  set title(value) {
    this.form.get('title').setValue(value);
  }

  get description() {
    return this.form.get('description').value;
  }

  set description(value) {
    this.form.get('description').setValue(value);
  }

  get price() {
    return this.form.get('price').value;
  }

  set price(value) {
    this.form.get('price').setValue(value);
  }

  get quantity() {
    return this.form.get('quantity').value;
  }

  set quantity(value) {
    this.form.get('quantity').setValue(value);
  }

  get category() {
    return this.form.get('category').value;
  }

  set category(value) {
    this.form.get('category').setValue(value);
  }

  get idProduct() {
    return this.form.get('idProduct').value;
  }

  set idProduct(value) {
    this.form.get('idProduct').setValue(value);
  }

  //#endregion

  createForm() {
    this.formProduct = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      idProduct: new FormControl(0)
    });
  }

  getInformation() {
    if (this.isUpdate) {
      this.title = this.productEdit.title;
      this.description = this.productEdit.description;
      this.price = this.productEdit.price;
      this.quantity = this.productEdit.quantity;
      this.category = this.productEdit.categoryId;
      this.idProduct = this.productEdit.id;
    }
  }

  Save() {
    this.spinner.show();
    const product = new ProductModelRequest();
    product.title = this.title;
    product.description = this.description;
    product.quantity = this.quantity;
    product.price = this.price;
    product.categoryId = this.category;
    product.id = this.idProduct;
    console.log(this.teste);

    if (this.isUpdate) {
      this.update(product);
    } else {
      this.create(product);
    }
  }

  create(product: ProductModelRequest) {
    this.productService.create(product)
    .subscribe((result) => {
      this.toastService.showSuccess();
      this.spinner.hide();
      this.close();
      this.productService.emittEvent.emit(product);
    }, (exc) => {
      exc.error.forEach(key => {
        this.toastService.showDanger(`${key.property} : ${key.message}`);
        this.spinner.hide();
        this.close();
      });
    });
  }

  update(product: ProductModelRequest) {
    this.productService.update(product)
    .subscribe((result) => {
      this.toastService.showSuccess();
      this.spinner.hide();
      this.close();
      this.productService.emittEvent.emit(product);
    }, (exc) => {
      exc.error.forEach(key => {
        this.toastService.showDanger(`${key.property} : ${key.message}`);
        this.spinner.hide();
        this.close();
      });
    });
  }

  clean() {
    this.form.reset();
  }

  close() {
    this.activeModal.dismiss('Cross click');
  }

}
