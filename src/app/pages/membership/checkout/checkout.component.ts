import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CheckoutData, OrderData, PaymentResponse } from '../../../models/membership.model';
import { UserData } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { PaymentService } from '../../../services/payment.service';
import { APP_ROUTES } from '../../../utils/constant';
declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  isSearching = false;
  checkoutData: CheckoutData | null = null;
  userData: UserData | null = null;
  private subscription: Subscription = new Subscription();



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private paymentService: PaymentService) { }

  ngOnInit() {
    this.subscription.add(this.authService.currentUser.subscribe(user => {
      this.userData = user ? user : null;
    }));
    const storedData = sessionStorage.getItem('checkoutData');
    if (storedData) {
      this.checkoutData = JSON.parse(storedData);
    }
  }

  processPayment() {
    // Implement payment processing logic here
    console.log('Processing payment for:', this.checkoutData);
    if (this.checkoutData && this.userData) {
      this.isSearching = true;
      this.paymentService.createOrder(this.checkoutData, this.userData).subscribe({
        next: (response: any) => {
          // Pass the order_id to Razorpay Checkout
          this.openRazorpayCheckout(response);
        },
        error: (err: any) => {
          this.isSearching = false;
          console.error('Error creating Razorpay order', err);
        }
      })
    }

  }

  openRazorpayCheckout(orderData: OrderData) {
    const options = {
      "key": environment.razorPayKeyId, // Replace with your Razorpay Key ID
      "amount": orderData.amount, // Amount in paise (50000 paise = 500 INR)
      "currency": "INR",
      "name": "Beat Matrimonial App",
      "description": "Test Transaction",
      "order_id": orderData.id, // Razorpay order_id from backend
      "handler": (response: any) => {
        console.log('Payment Success:', response);
        // Handle payment verification and status update
        this.verifyPayment(response, orderData);
      },
      "prefill": {
        "name": this.userData?.firstName + ' ' + this.userData?.lastName,
        "email": this.userData?.email,
        "contact": "9999999999"
      },
      "theme": {
        "color": "#e11d48"
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
    this.isSearching = false;
  }

  verifyPayment(paymentResponse: PaymentResponse, orderData: any) {
    this.paymentService.verifyPayment(paymentResponse).subscribe({
      next: (response: any) => {
        this.isSearching = false;
        console.log('Payment verified:', response);
        // After successful payment, clear the session storage
        sessionStorage.removeItem('checkoutData');
        // Navigate to a confirmation page or back to the membership page
        this.router.navigate([APP_ROUTES.ORDER_CONFIRMATION], {
          queryParams: {
            orderId: orderData.id,
            paymentId: paymentResponse.razorpay_payment_id,
            amount: orderData.amount / 100 // Convert from paise to rupees
          }
        });
      },
      error: (error: any) => {
        this.isSearching = false;
        console.error('Payment verification failed', error);
      }
    });
  }

  navigateToMembershipPlan() {
    this.router.navigate(['/membership']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
