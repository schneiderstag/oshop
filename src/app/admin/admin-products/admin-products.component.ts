import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$;

  constructor(
    private router: Router,
    private productService: ProductService) {
    this.products$ =  this.productService.getAll();
  }

  delete(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(productId);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}
