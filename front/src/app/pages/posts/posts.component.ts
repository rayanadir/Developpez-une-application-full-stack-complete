import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { User } from 'src/app/interfaces/user.interface';
import { PostsService } from 'src/app/services/posts/posts.service';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy, AfterViewInit {

  public currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  public responsiveSubscription! : Subscription;

  public posts!: Post[];

  constructor(
    public responsiveService: ResponsiveService,
    public router: Router,
    public postsService: PostsService,
    public userService: UserService,
    ) {
    this.currentBreakpoint = this.responsiveService.breakpointChanged();
    if(this.currentBreakpoint!=undefined){
      document.querySelector('main')?.setAttribute('format', this.currentBreakpoint);
      document.querySelector('.create-filter')?.setAttribute('format', this.currentBreakpoint);
      document.querySelector('.posts')?.setAttribute('format', this.currentBreakpoint);
    }
   }

   public ngOnInit(): void {
    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
      if(this.currentBreakpoint!=undefined){
        document.querySelector('.main-posts')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.create-filter')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.posts')?.setAttribute('format', this.currentBreakpoint);
      }
    });
    this.getPosts();
  }

  public ngOnDestroy(): void {
      this.responsiveSubscription.unsubscribe();
  }

  public ngAfterViewInit(): void {
      if(this.currentBreakpoint!=undefined){
        document.querySelector('.main-posts')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.create-filter')?.setAttribute('format', this.currentBreakpoint);
        document.querySelector('.posts')?.setAttribute('format', this.currentBreakpoint);
      }
  }

  public navigate() : void {
    this.router.navigate(['/create']);
  }

  public navigateToPost(id:number) : void {
    this.router.navigate([`/post/${id}`]);
  }

  public getPosts() : void {
    this.postsService.all().subscribe((posts: Post[]) => {
      this.posts=posts.map((post: Post) => {
        return {
          ...post,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt),
        };
      }).sort((a,b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
    })
  }
}
