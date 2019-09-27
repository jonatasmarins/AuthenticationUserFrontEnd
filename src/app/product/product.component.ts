import { ToastService } from './../shared/service/toast.service';
import { ProductDetailComponent } from './dialog-modal/product-detail/product-detail.component';
import { ProductService } from './services/product.service';
import { ProductModelResponse } from './models/product-model-response';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderPipe } from 'ngx-order-pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModelRequest } from './models/product-model-request';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  collectionSize: number;
  pageSize: number;
  page: number;

  products: ProductModelResponse[] = [];
  nameFilter = '';

  order = 'createDate';
  reverse = false;

  constructor(
    private productService: ProductService,
    private orderPipe: OrderPipe,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {
    orderPipe.transform(this.products, 'createDate');
  }

  ngOnInit() {
    this.getProducts();

    this.productService.emittEvent.subscribe(() => {
      this.getProducts();
    });

  }

  getProducts() {
    this.spinner.show();
    this.productService.getProduct(this.nameFilter)
      .subscribe((result) => {
        this.products = result;
        this.setPagination();
        this.spinner.hide();
      },
        (error) => {
          this.spinner.hide();
        });
  }

  edit(product: ProductModelResponse) {
    this.openDetailEditProduct(product);
  }

  delete(product: ProductModelResponse) {
    this.spinner.show();

    const objRequest = new ProductModelRequest();
    objRequest.id = product.id;
    objRequest.title = product.title;
    objRequest.description = product.description;
    objRequest.quantity = product.quantity;
    objRequest.price = product.price;
    objRequest.categoryId = product.categoryId;

    this.productService.delete(objRequest).subscribe(() => {
      this.toastService.showSuccess();
      this.spinner.hide();
      this.getProducts();
    });
  }

  openDetailCreateProduct() {
    const modalRef = this.modalService.open(ProductDetailComponent);
    modalRef.componentInstance.titleDialog = 'Cadastro';
  }

  openDetailEditProduct(product: ProductModelResponse) {

    const request = new ProductModelRequest();
    request.id = product.id;
    request.title = product.title;
    request.description = product.description;
    request.price = product.price;
    request.quantity = product.quantity;
    request.categoryId = product.categoryId;

    const modalRef = this.modalService.open(ProductDetailComponent);
    modalRef.componentInstance.titleDialog = 'Cadastro';
    modalRef.componentInstance.productEdit = request;
    modalRef.componentInstance.isUpdate = true;
  }

  setPagination() {
    this.collectionSize = this.products.length;
    this.pageSize = 5;
    this.page = 1;
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
}
