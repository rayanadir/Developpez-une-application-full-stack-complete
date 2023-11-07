import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/services/posts/posts.service';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  public posts!: Post[];
  public postsAllSubscription!: Subscription;

  constructor(
    public responsiveService: ResponsiveService,
    public router: Router,
    public postsService: PostsService,
    public userService: UserService,
    ) { }

   public ngOnInit(): void {
    this.getPosts();
  }

  public ngOnDestroy(): void {
      this.postsAllSubscription.unsubscribe();
  }

  public navigate() : void {
    this.router.navigate(['/create']);
  }

  public navigateToPost(id:number) : void {
    this.router.navigate([`/post/${id}`]);
  }

  public getPosts() : void {
    this.postsAllSubscription = this.postsService.all().subscribe((posts: Post[]) => {
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
