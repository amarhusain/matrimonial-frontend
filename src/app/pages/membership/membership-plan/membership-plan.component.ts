import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutData } from '../../../models/membership.model';
import { APP_ROUTES } from '../../../utils/constant';

interface Plan {
  name: string;
  superInterest: number;
  spotlights: number;
  contactViews: number;
  sharpfinder: boolean;
  relationshipManager: boolean;
}

interface Feature {
  name: string;
  type: 'check' | 'cross' | 'number';
  key: keyof Plan;
}

@Component({
  selector: 'app-membership-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './membership-plan.component.html',
  styleUrl: './membership-plan.component.scss'
})
export class MembershipPlanComponent {

  isAssistedView = false;
  showUpgradeMembership = false;
  selectedPlanName = 'Pro';
  constructor(
    private router: Router,
    private route: ActivatedRoute) {

  }

  plans: Plan[] = [
    { name: 'Pro', superInterest: 20, spotlights: 3, contactViews: 20, sharpfinder: false, relationshipManager: false },
    { name: 'Pro Max', superInterest: 40, spotlights: 6, contactViews: 60, sharpfinder: false, relationshipManager: false },
    { name: 'Pro Supreme', superInterest: 80, spotlights: 9, contactViews: 100, sharpfinder: true, relationshipManager: false }
  ];

  features: Feature[] = [
    { name: 'Unlimited calls & contact sharing', type: 'check', key: 'name' }, // We use 'name' as a dummy key here
    { name: 'Super Interest', type: 'number', key: 'superInterest' },
    { name: 'Spotlights', type: 'number', key: 'spotlights' },
    { name: 'Contact views', type: 'number', key: 'contactViews' },
    { name: 'Sharpfinder', type: 'cross', key: 'sharpfinder' },
    { name: 'Relationship Manager', type: 'cross', key: 'relationshipManager' }
  ];

  selfServiceDurations = [
    { name: '3 months', price: 125, selected: true },
    { name: '6 months', price: 175, selected: false },
    { name: 'Till Marriage', price: 375, selected: false }
  ];


  assistedDurations = [
    { name: '3 months', price: 950, selected: true },
    { name: '6 months', price: 1500, selected: false },
    { name: '12 months', price: 2500, selected: false }
  ];

  onUpgradeClick() {

  }

  // Method to handle changes when a duration is selected
  onDurationChange(selectedDuration: any) {
    console.log('Selected Duration:', selectedDuration.name);
    // Determine which duration list to work with
    const durationsList = this.isAssistedView ? this.assistedDurations : this.selfServiceDurations;

    // Update the selected state of the durations
    durationsList.forEach(duration => {
      duration.selected = (duration.name === selectedDuration.name);
    });
    // Set plan name based on duration

    switch (selectedDuration.name) {
      case '3 months':
        this.selectedPlanName = 'Pro';
        break;
      case '6 months':
        this.selectedPlanName = 'Pro Max';
        break;
      case 'Till Marriage':
        this.selectedPlanName = 'Pro Supreme';
        break;
      default:
        this.selectedPlanName = 'Pro';  // Or whatever default you prefer
    }
  }

  proceedToCheckout() {
    const selectedDuration = this.isAssistedView
      ? this.assistedDurations.find(d => d.selected)
      : this.selfServiceDurations.find(d => d.selected);

    if (!selectedDuration) {
      alert('Please select a duration');
      return;
    }

    const checkoutData: CheckoutData = {
      plan: this.isAssistedView ? 'Exclusive' : this.selectedPlanName,
      duration: selectedDuration.name,
      amount: selectedDuration.price
    };

    // Store checkout data in session storage
    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));

    // Navigate to checkout page
    this.router.navigate([APP_ROUTES.CHECKOUT], { relativeTo: this.route });
  }


}

