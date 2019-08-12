"use strict";

export class KeyTar {

    public static setPassword(service: string, account: string, password: string) {
        if (!this.services) {
            this.services = new Map();
        }

        let accounts = this.services.get(service);
        if (!accounts) {
            accounts = [{account, password}];
        } else {
            accounts.push({account, password});
        }

        this.services.set(service, accounts);
    }

    public static getPassword(service: string, account: string) {
        const accounts = this.services.get(service);

        let password: string = null;
        accounts.forEach((value, index) => {
            if (value["account"] === account) {
                password = value["password"];
            }
        });

        return password;
    }

    public static deletePassword(service: string, account: string) {
        const accounts = this.services.get(service);

        accounts.forEach((value, index) => {
            if (value["account"] === account) {
                accounts[index] = null;
            }
        });

        this.services.set(service, accounts);
    }

    private static services: Map<string, [any]>;
}
