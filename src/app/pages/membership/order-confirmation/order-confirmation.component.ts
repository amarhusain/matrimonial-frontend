import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserData } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss'
})
export class OrderConfirmationComponent {
  orderId: string | null = null;
  transactionId: string | null = null;
  amount: number | null = null;
  planName: string | null = null;
  userData: UserData | null = null;

  private subscription: Subscription = new Subscription();


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.subscription.add(this.authService.currentUser.subscribe(user => {
      this.userData = user ? user : null;
    }));
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
      this.transactionId = params['transactionId'];
      this.amount = params['amount'];
      this.planName = params['planName'];
    });
  }

  navigateToProfile() {
    // Implement navigation to profile completion page
    console.log('Navigating to profile completion page');
    this.router.navigate(['/user/profile/', this.userData?.id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
