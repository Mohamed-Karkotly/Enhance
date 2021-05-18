import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegExService {
  emptySpaces: string;
  name: RegExp; // Support international names
  //-> All following passwords are in minimum eight characters long
  password: RegExp; // At least one letter and one number
  normalPassword: string; // At least one letter, one number and one special character
  mediumPassword: string; // At least one uppercase letter, one lowercase letter and one number
  complexPassword: string; // At least one uppercase letter, one lowercase letter, one number and one special character
  strictPassword: string; // Maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  email: RegExp;
  constructor() {
    this.emptySpaces = "^\S$|^\S[\s\S]*\S$";
    this.name = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    this.password = /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,}$/;
    this.mediumPassword = '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$';
    this.complexPassword = '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$';
    this.strictPassword = '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,10}$';
    this.email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  }
}
