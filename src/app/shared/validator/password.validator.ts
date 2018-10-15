import { FormGroup, FormArray, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";

export class PasswordValidator {
    static passwordPattern(control: FormControl): { [key: string]: boolean } {
        if (control.value && control.value.length >= 7) {
            let value: string = control.value;
            if (!/[0-9]+/.test(value) || !/[A-Z]+/.test(value) || !/[a-z]+/.test(value) || !/[^0-9A-Za-z]+/.test(value)) {
                return { 'weakPattern': true };
            }
        }
        return null;
    }

    static passwordRetypeCheck(control: FormControl): { [key: string]: any } {
        const form: FormGroup | FormArray = control.parent;
        if (form != null) {
            const passWordControl: FormControl = form.controls['newPassword'];
            const passWordRetypeControl: FormControl = form.controls['confirmPassword'];

            const password = passWordControl.value;
            const passwordRetype = passWordRetypeControl.value;

            if (password.length >= 7 && passwordRetype.length >= 7 && password !== passwordRetype) {
                const errorValue: { [key: string]: any } = { 'unmatch': true };
                if (control == passWordRetypeControl) {
                    return errorValue;
                } else {
                    PasswordValidator.addErrors(passWordRetypeControl, errorValue);
                }
            } else {
                if (control != passWordRetypeControl) {
                    PasswordValidator.removeError(passWordRetypeControl, 'unmatch');
                }
            }
        }
        return null;
    }

    private static addErrors(control: AbstractControl, errors: { [key: string]: any }): void {
        if (control.errors == null) {
            control.setErrors(errors);
        } else {
            Object.assign(control.errors, errors);
        }
    }

    private static removeError(control: AbstractControl, error: string): void {
        if (control.errors != null) {
            delete control.errors[error];
            if (!Object.keys(control.errors).length) {
                control.setErrors(null);
            }
        }
    }
}
