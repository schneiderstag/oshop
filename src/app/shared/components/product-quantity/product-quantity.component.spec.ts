import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductQuantityComponent } from './product-quantity.component';

describe('ProductQuantityComponent', () => {
  let component: ProductQuantityComponent;
  let fixture: ComponentFixture<ProductQuantityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
