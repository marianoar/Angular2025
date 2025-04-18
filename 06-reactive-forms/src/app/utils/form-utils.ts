import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

// OJO retirar
async function sleep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 2500);
    })
}

export class FormUtils {

    static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

    static isValidFile(form: FormGroup, fieldName: string): boolean | null {
        return (!!form.controls[fieldName].errors && form.controls[fieldName].touched);
    }

    static getFieldError(form: FormGroup, fieldName: string): string | null {
        if (!form.controls[fieldName])
            return null;

        const errors = form.controls[fieldName].errors ?? {};

        return FormUtils.getTextError(errors);

    }
    static isValidFieldInArray(formArray: FormArray, index: number) {
        return (formArray.controls[index].errors && formArray.controls[index].touched);
    }
    static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
        if (formArray.controls.length === 0)
            return null;

        const errors = formArray.controls[index].errors ?? {};
        return FormUtils.getTextError(errors);

    }

    static getTextError(errors: ValidationErrors) {
        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'Este campo es requerido';
                case 'minlength':
                    return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
                case 'min':
                    return `Valor minimo de ${errors['min'].min}`;
                case 'email':
                    return `Debe ingresar un correo electronico`;
                case 'emailTaken':
                    return `El correo electrinico ingresado ya ha sido ocupado.`
                case 'pattern':
                    if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
                        return 'El formato del correo electronico no es correcto o no es admitido';
                    }
                    break;
                case 'usernameTaken':
                    return `El nombre de usuario ya ha sido ocupado`;
                default:
                    return `Se ha producido un error de validación en ${key};`
            }
        }
        return null;
    }

    static isFielOneEqualFieldTwo(fieldOne: string, fieldTwo: string) {
        return (formGroup: AbstractControl) => {
            const value1 = formGroup.get(fieldOne)?.value;
            const value2 = formGroup.get(fieldTwo)?.value;
            return value1 === value2 ? null : { fieldsNotEqual: true };
        }
    }

    static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
        console.log('Validando');
        await sleep();
        const formValue = control.value;
        if (formValue == 'sarasa@sasa.com') {
            return { emailTaken: true };

        }
        return null;
    }

    static usernameNotAvailable(control: AbstractControl) {
        const value = control.value;
        return value === 'mariano' ? { usernameTaken: true } : null
    }
}

