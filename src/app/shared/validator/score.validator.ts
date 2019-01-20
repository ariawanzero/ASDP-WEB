import { FormControl } from "@angular/forms";

export class ScoreValidator {
    static validateScore(control: FormControl): { [key: string]: boolean } {
        if (control.value) {
            let value: number = control.value;
            if(value < 0 || value > 100) {
                return { 'invalidScore': true };    
            }
        }
        return null;
    }
}
