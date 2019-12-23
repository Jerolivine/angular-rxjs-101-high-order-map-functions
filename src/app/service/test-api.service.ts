import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Item } from "../model/item";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TestApiService {
  private url = "https://jsonplaceholder.typicode.com/todos/";

  constructor(private httpClient: HttpClient) {}

  getItem(value: number): Observable<any> {
    const requestUrl: string = this.url + value.toString();
    return this.httpClient
      .get(requestUrl)
      .pipe(delay(this.getRandomDelayTime()));
  }

  private getRandomDelayTime(): number {
    const max = 1000;
    const min = 500;
    const randomDelayTime: number =
      Math.floor(Math.random() * (max - min + 1)) + min;

    console.log("Delay Time " + randomDelayTime);
    return randomDelayTime;
  }
}
