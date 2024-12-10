export class UserAuthManager {
    isLoggedIn: boolean;
    userData: {
        id: number | null;
        name: string | null;
        email: string | null;
    };

    constructor(uId?: number, uName?: string, uMail?: string) {
        this.isLoggedIn = !!(uId && uName && uMail);
        this.userData = {
            id: uId || null,
            name: uName || null,
            email: uMail || null,
        };
    }


    login(uId: number, uName: string, uMail: string): void {
        this.isLoggedIn = true;
        this.userData = {
            id: uId,
            name: uName,
            email: uMail,
        };
    }

    logout(): void {
        this.isLoggedIn = false;
        this.userData = {
            id: null,
            name: null,
            email: null,
        };
    }
}