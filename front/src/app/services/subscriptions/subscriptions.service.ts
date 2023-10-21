import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from 'src/app/interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private pathService = "api/subscription"

  constructor(private httpClient: HttpClient) { }

  // click on subscribe/unsubscribe button
  public click(id: string): Observable<"Subscribed !" | "Unsubscribed !"> {
    return this.httpClient.post<"Subscribed !" | "Unsubscribed !">(`${this.pathService}/${id}`, id);
  }

  public all(): Observable<Topic[]>{
    return this.httpClient.get<Topic[]>(this.pathService)
  }
}
