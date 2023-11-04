import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { PostRequest } from 'src/app/interfaces/postRequest.interface';
import { Topic } from 'src/app/interfaces/topic.interface';
import { PostsService } from 'src/app/services/posts/posts.service';
import { TopicsService } from 'src/app/services/topics/topics.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

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
    public router: Router,
    public fb: FormBuilder,
    public postsService: PostsService,
    public topicsService: TopicsService
    ) { }

  public ngOnInit(): void {

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
