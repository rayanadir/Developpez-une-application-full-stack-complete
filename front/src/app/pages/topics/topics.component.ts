import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { Topic } from 'src/app/interfaces/topic.interface';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';
import { SubscriptionsService } from 'src/app/services/subscriptions/subscriptions.service';
import { TopicsService } from 'src/app/services/topics/topics.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  public topics: Topic[] | undefined;
  public subscriptions: number[] | undefined;
  public isSubscribed: boolean | undefined;

  constructor(
    public topicsService: TopicsService,
    public subscriptionsService: SubscriptionsService
    ) {  }

  public ngOnInit(): void {
    this.getSubscribedTopics();
    this.getTopics();    
  }

  public getTopics(){
    this.topicsService.all().subscribe((topics) => {
      this.topics=topics;
    })
  }

  public getSubscribedTopics() {
    this.subscriptionsService.all().subscribe((subscriptions: Topic[]) => {
      this.subscriptions=subscriptions.map((s) => {
        return s.id
      });
    })
  }

  public click(id:number) : void {
    this.subscriptionsService.click(id).subscribe((res) => {
      if(res.message === "Subscribed !" && this.subscriptions){
        let subscriptions = this.subscriptions;
        this.subscriptions= [...subscriptions, id];
      }else if(res.message === "Unsubscribed !" && this.subscriptions){
        this.subscriptions = this.subscriptions.filter((subscription_id) => subscription_id!=id);
      }
    })
  }

}
