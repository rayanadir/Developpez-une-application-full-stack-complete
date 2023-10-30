import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { PostRequest } from 'src/app/interfaces/postRequest.interface';
import { Topic } from 'src/app/interfaces/topic.interface';
import { PostsService } from 'src/app/services/posts/posts.service';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';
import { TopicsService } from 'src/app/services/topics/topics.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {

  public currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;

  public postForm = this.fb.group({
    topic_id: [
      0,
      [
        Validators.required,
      ]
    ],
    title: [
      '',
      [
        Validators.required,
        Validators.max(50)
      ]
    ],
    content: [
      '',
      [
        Validators.required,
        Validators.max(2000),
      ]
    ]
  });

  public topics$: Observable<Topic[]> = this.topicsService.all();

  constructor(
    public responsiveService: ResponsiveService,
    public router: Router,
    public fb: FormBuilder,
    public postsService: PostsService,
    public topicsService: TopicsService
    ) { }

  public ngOnInit(): void {
    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
      if(this.currentBreakpoint!=undefined){
        document.querySelector('.main-create')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.card-header')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.create-content')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.title')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.back')?.setAttribute('format', this.currentBreakpoint);
      }
    });
  }

  public ngOnDestroy(): void {
      this.responsiveSubscription.unsubscribe()
  }

  public back(){
    this.router.navigate(['/posts'])
  }

  public submit() : void {
    const postRequest = this.postForm.value as PostRequest;
    this.postsService.create(postRequest).subscribe((res: Post) => {
      this.router.navigate([`/post/${res.id}`]);
    })
  }
}
