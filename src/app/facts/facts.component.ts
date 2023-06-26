import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject, take, combineLatest, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserStore } from '../stores/user.store';


@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.scss']
})
export class FactsComponent implements OnInit{

  public user$!: Observable<User>;
  private _rawFact$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public fact$!: Observable<string>;

  constructor(private _client: HttpClient, private _userStore: UserStore) {}

  public ngOnInit(): void {
      this.user$ = this._userStore.getCurrentUser();
      this.fact$ = combineLatest([
        this.user$,
        this._rawFact$
      ]).pipe(
        map(([user, fact]) => {
          return fact.replace(new RegExp(/[C][h][u][c][k][\s][N][o][r][r][i][s]/g), `${user?.surname} ${user?.name}`)
        })
      )
  }

  public updateFact(): void {
    this._client.get('https://api.chucknorris.io/jokes/random').pipe(
      take(1)
    ).subscribe({
      next: (response: any) => this._rawFact$.next(response.value),
      error: (error) => console.error(error)
    })
  }
}
