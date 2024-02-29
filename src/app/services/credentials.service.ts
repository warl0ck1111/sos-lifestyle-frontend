import { Injectable } from '@angular/core';
import {ApiSuccessResponse, AuthenticationResponse} from "../model/user-auth";
import {Observable, of} from "rxjs";


const credentialsKey = 'credentials';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
    providedIn: 'root',
})
export class CredentialsService {
    private _credentials: AuthenticationResponse | null = null;

    constructor() {
        const savedCredentials =
            localStorage.getItem(credentialsKey) || sessionStorage.getItem(credentialsKey);
        if (savedCredentials) {
            this._credentials = JSON.parse(savedCredentials);
            // console.log(this._credentials)
        }
    }

    /**
     * Checks is the user is authenticated.
     * @return True if the user is authenticated.
     */
    isAuthenticated(): boolean {
        console.log("CredentialsService/isAuthenticated:"+JSON.stringify(this.credentials))
        console.log("CredentialsService/isAuthenticated/of:"+JSON.stringify(of(!!this.credentials).subscribe()))

        return !!this._credentials
    }

    /**
     * Gets the user credentials.
     * @return The user credentials or null if the user is not authenticated.
     */
    get credentials(): AuthenticationResponse | null {
        return this._credentials;
    }

    /**
     * Update the user credentials.
     * Mostly needed if user changed username and needs to update it in loginContext
     * @param credentials The user credentials.
     */
    updateCredentials(credentials?: AuthenticationResponse) {
        const test = localStorage.getItem(credentialsKey);
        const storage = test ? localStorage : sessionStorage;
        storage.setItem(credentialsKey, JSON.stringify(credentials));
        this._credentials = credentials || null;
    }

    /**
     * Sets the user credentials.
     * The credentials may be persisted across sessions by setting the `remember` parameter to true.
     * Otherwise, the credentials are only persisted for the current session.
     * @param credentials The user credentials.
     * @param remember True to remember credentials across sessions.
     */
    setCredentials(credentials?: AuthenticationResponse) {
        this._credentials = credentials || null;

        if (credentials) {
            localStorage.setItem(credentialsKey, JSON.stringify(credentials));
        } else {
            sessionStorage.removeItem(credentialsKey);
            localStorage.removeItem(credentialsKey);
        }
    }


    clearStorage() {
        sessionStorage.clear();
        localStorage.clear();
    }


    /**
     * logOut User Without Removing The other user persisted details in session or local memory
     */
    clearUserLoginDetails(){
        sessionStorage.removeItem(credentialsKey)
        localStorage.removeItem(credentialsKey)
    }

}
