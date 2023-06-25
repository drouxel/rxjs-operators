import { User } from "../models/user.model";
import { BehaviorSubject, Observable } from 'rxjs'
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserStore {
    private _user$: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);

    /**
     * @returns the current value of the user in the app memory
     */
    public getUser(): Observable<User|null> {
        return this._user$.asObservable();
    }

    /**
     * sets the new value of the user and emits an event to inform all subscribers that the value has changed
     * @param user 
     */
    public setUser(user: User|null): void {
        this._user$.next(user);
    }
}