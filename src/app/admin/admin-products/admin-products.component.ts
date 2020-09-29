import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy { 
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;

  @ViewChild('agGridGroup') agGridGroup: AgGridAngular;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  // ag-grid
  // columnDefs = [
  //   { field: 'make', sortable: true, filter: true },
  //   { field: 'model', sortable: true, filter: true },
  //   { field: 'price', sortable: true, filter: true }
  // ];

  // rowData = [ using products in the template
  //     { make: 'Toyota', model: 'Celica', price: 35000 },
  //     { make: 'Ford', model: 'Mondeo', price: 32000 },
  //     { make: 'Porsche', model: 'Boxter', price: 72000 }
  // ];

  // columnDefs = [
  //   { field: 'title', sortable: true, filter: true, checkboxSelection: true },
  //   { field: 'price', sortable: true, filter: true }
  // ];

  defaultColDef = {
    sortable: true,
    filter: true
  };

  columnDefsGroup = [
    { field: 'category', rowGroup: true },
    { field: 'price' }
  ];

  autoGroupColumnDef = {
    headerName: 'Title',
    field: 'title',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
        checkbox: true
    }
  };

  columnDefs = [
    { field: 'title', sortable: true, filter: true, checkboxSelection: true },
    { field: 'price', sortable: true, filter: true }
  ];
  // ag-grid

  constructor(private router: Router, private productService: ProductService) {
    this.subscription = this.productService.getAll()
    .subscribe(products => this.filteredProducts = this.products = products);
  }

  delete(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(productId);
    this.router.navigate(['/admin/products']);
  }

  filter(query: string) {
    console.log(query);
    this.filteredProducts = (query) ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void { 

  }

  //ag-grid
  getSelectedRowsGroup() {
    const selectedNodes = this.agGridGroup.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => {
      if (node.groupData) {
        return { category: node.key, title: 'Group' };
      }
      return node.data;
    });      
    const selectedDataStringPresentation = selectedData.map(node => node.category + ' ' + node.title + ' ' + node.price).join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);      
    const selectedDataStringPresentation = selectedData.map(node => node.category + ' ' + node.title + ' ' + node.price).join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
  //ag-grid
}
