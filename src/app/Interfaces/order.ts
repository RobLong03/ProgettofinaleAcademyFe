export interface Address {
    id: number;
    customerID: number;
    country: string;
    city: string;
    postalCode: string;
    street: string;
    houseNumber: number;
}

export interface Customer {
    id: number;
    name: string;
    surname: string;
    taxId: string;
    email: string;
    addresses: Address[];
}

export interface Product {
    id: number;
    brand: string;
    model: string;
    description: string | null;
    type: string;
    stock: number;
    price: number;
    imageUrl: string;
}

export interface OrderItem {
    id: number;
    product: Product;
    orderId: number;
    quantity: number;
    unitary_price: number;
}

export interface OrderData {
    id: number;
    customer: Customer;
    address: Address;
    orderDate: string;
    totalPrice: number;
    orderItemsList: OrderItem[];
    status: string;
}

export interface OrderApiResponse {
    rc: any;
    msg: any;
    dati: OrderData;
}

export interface CreateOrderRequest {
    customerId: number;
    addressId: number;
}

export interface UpdateOrderRequest {
    id: number;
    addressId: number;
}

export interface UpdateOrderStatusRequest {
    id: number;
    status: string;
}

export interface DeleteOrderRequest {
    id: number;
}