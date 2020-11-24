import { Order } from 'shared/models/order';
import { Observable } from 'rxjs';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-orders-detail',
  templateUrl: './admin-orders-detail.component.html',
  styleUrls: ['./admin-orders-detail.component.css']
})
export class AdminOrdersDetailComponent implements OnInit {
  order$: Observable<Order>;
  id: string;

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.order$ = await this.orderService.getOrderById(this.id);
  }
}
