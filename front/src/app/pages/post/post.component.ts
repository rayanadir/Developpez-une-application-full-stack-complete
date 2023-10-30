import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Comment } from 'src/app/interfaces/comment.interface';
import { Post } from 'src/app/interfaces/post.interface';
import { Topic } from 'src/app/interfaces/topic.interface';
import { User } from 'src/app/interfaces/user.interface';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';
import { TopicsService } from 'src/app/services/topics/topics.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy, AfterViewInit {

  public currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;

  public postId: string;
  public post: Post | undefined;
  public comments!: Comment[];
  
  public form = this.fb.group({
    content: [
      '',
      [Validators.required]
    ]
  })

  public commentForm: FormGroup | undefined

  constructor(
    public responsiveService: ResponsiveService,
    public router: Router,
    public route: ActivatedRoute,
    public postsService: PostsService,
    public commentsService: CommentsService,
    public fb: FormBuilder,
    public topicsService: TopicsService,
    public userService: UserService
    ) { 
      this.postId = this.route.snapshot.paramMap.get('id')!;
     }

  public ngOnInit(): void {
    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
      if(this.currentBreakpoint!=undefined){
        document.querySelector('.main-post')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.post')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.card-header')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.comments')?.setAttribute('format', this.currentBreakpoint);
        document.querySelectorAll('.comments__comment').forEach((e) => {
          if(this.currentBreakpoint) e.setAttribute('format', this.currentBreakpoint)
        })
        document.querySelectorAll('.comments__comment__text').forEach((e) => {
          if(this.currentBreakpoint) e.setAttribute('format', this.currentBreakpoint)
        })
        document.querySelector('.comment')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.button-send')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('hr')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.div_back')?.setAttribute('format',this.currentBreakpoint);
      }
    });
    this.loadPost();
    this.loadComments(this.postId);
  }

  public ngOnDestroy(): void {
    this.responsiveSubscription.unsubscribe();
  }

  public ngAfterViewInit(): void {
      if(this.currentBreakpoint!=undefined){
        document.querySelectorAll('.comments__comment').forEach((e) => {
          if(this.currentBreakpoint) e.setAttribute('format', this.currentBreakpoint)
        })
        document.querySelectorAll('.comments__comment__text').forEach((e) => {
          if(this.currentBreakpoint) e.setAttribute('format', this.currentBreakpoint)
        });
        document.querySelector('.div_back')?.setAttribute('format',this.currentBreakpoint);
      }
  }

  public back(): void {
    this.router.navigate(['/posts']);
  }

  public loadPost() : void {
    this.postsService.detail(this.postId).subscribe({
        next: (post: Post) => {
          this.post = {
            ...post,
            createdAt: new Date(post.createdAt),
            updatedAt: new Date(post.createdAt),
          };
        },
        error: () => {
          this.router.navigate(['**']);
        },
      })
  }

  public loadComments(id: string) : void {
    this.commentsService.all(id).subscribe((comments: Comment[]) => {
      this.comments=comments.sort((a,b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      });
    })
  }

  public sendComment() : void {
    let commentRequest = this.form.value as Comment;
    commentRequest.postId=parseInt(this.postId);
    this.commentsService.create(commentRequest).subscribe((comment: Comment) => {
      this.comments= [...this.comments, comment]
    });
    this.form.reset();
  }
}
