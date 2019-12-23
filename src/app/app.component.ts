import { Component } from "@angular/core";
import { concatMap, mergeMap, switchMap, exhaustMap } from "rxjs/operators";
import { Subscription, Subject, Observable } from "rxjs";
import { TestApiService } from "./service/test-api.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  private id: number = 0;

  private concatMapSubject = new Subject<number>();
  private concatMapObs$ = this.concatMapSubject.asObservable();

  private mergeMapSubject = new Subject<number>();
  private mergeMapObs$ = this.mergeMapSubject.asObservable();

  private switchMapSubject = new Subject<number>();
  private switchMapObs$ = this.switchMapSubject.asObservable();

  private exhaustMapSubject = new Subject<number>();
  private exhaustMapObs$ = this.exhaustMapSubject.asObservable();

  private subscriptionConcatMap: Subscription;
  private subscriptionMergeMap: Subscription;
  private subscriptionSwitchMap: Subscription;
  private subscriptionExhaustMap: Subscription;

  constructor(private testApiService: TestApiService) {}

  ngOnInit() {
    this.subscriptionConcatMap = this.concatMapObs$
      .pipe(concatMap((id: number) => this.testApiService.getItem(id)))
      .subscribe(item => {
        console.log("concat map " + JSON.stringify(item));
      });

    this.subscriptionMergeMap = this.mergeMapObs$
      .pipe(mergeMap((id: number) => this.testApiService.getItem(id)))
      .subscribe(item => {
        console.log("merge map " + JSON.stringify(item));
      });

    this.subscriptionSwitchMap = this.switchMapObs$
      .pipe(switchMap((id: number) => this.testApiService.getItem(id)))
      .subscribe(item => {
        console.log("switch map " + JSON.stringify(item));
      });

    this.subscriptionExhaustMap = this.exhaustMapObs$
      .pipe(exhaustMap(id => this.testApiService.getItem(id)))
      .subscribe(item => {
        console.log("exhaust map " + JSON.stringify(item));
      });
  }

  ngOnDestroy() {
    this.subscriptionConcatMap.unsubscribe();
    this.subscriptionMergeMap.unsubscribe();
    this.subscriptionSwitchMap.unsubscribe();
    this.subscriptionExhaustMap.unsubscribe();
  }

  concatMapClick() {
    this.concatMapSubject.next(++this.id);
  }

  mergeMapClick() {
    this.mergeMapSubject.next(++this.id);
  }

  switchMapClick() {
    this.switchMapSubject.next(++this.id);
  }

  exhaustMapClick() {
    this.exhaustMapSubject.next(++this.id);
  }

}
