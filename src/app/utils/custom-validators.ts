import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

    // Validator for 10-digit mobile number
    static mobileNumberValidator(control: AbstractControl): ValidationErrors | null {
        const mobileNumberPattern = /^[0-9]{10}$/;

        // Check if control value matches the pattern
        if (control.value && !mobileNumberPattern.test(control.value)) {
            return { invalidmobile: true };  // Return an error object
        }

        return null;  // Return null if validation passes
    }

    static ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value) {
            const birthDate = new Date(control.value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 21) {
                return { 'underage': true };
            }
        }
        return null;
    }

    static futureDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value) {
            const inputDate = new Date(control.value);
            const today = new Date();
            if (inputDate > today) {
                return { 'futureDate': true };
            }
        }
        return null;
    }

}
