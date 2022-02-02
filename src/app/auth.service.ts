import { Injectable } from "@angular/core";


@Injectable()

export class AuthService {
    isLogin: boolean = false;

    setLogin(value: boolean) {
        this.isLogin = value;
    }

    getLogin() {
        return this.isLogin;
    }
}