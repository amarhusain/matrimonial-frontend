import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CheckoutData, PaymentResponse } from '../models/membership.model';
import { UserData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrder(checkoutData: CheckoutData, userData: UserData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/payments/create-order`, { amount: checkoutData.amount, userId: userData.id });
  }

  verifyPayment(paymentResponse: PaymentResponse) {
    return this.http.post(`${this.apiUrl}/payments/verify-payment`, paymentResponse);
  }
}
