export class Invoice {
  orderId: number = 0;
  clientId: number = 0;
  type: string = '';
  status: string = '';
  iva: number = 0;
  discountRequestList: DiscountRequest[] = [new DiscountRequest()];
  reservationId: number = 0;
  paymentMethodList: PaymentMethod[] = [new PaymentMethod()];
  details: OrderDetail[] = [new OrderDetail()];
}

export class DiscountRequest {
  monto: number = 0;
  description: string = '';
}

export class PaymentMethod {
  amount: number = 0;
  paymentMethod: number = 0;
  observations: string = '';
}

export class Product {
  product_id: string = '';
  name: string = '';
  price: number = 0;
}

export class OrderDetail {
  product: Product = new Product();
  amount: number = 0;
  measurementUnit: string = '';
}


