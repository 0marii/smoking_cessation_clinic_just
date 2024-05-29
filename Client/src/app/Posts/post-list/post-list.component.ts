import { Component, OnInit } from '@angular/core';
import { member } from 'src/app/_models/member';
import { post } from 'src/app/_models/post';
import { user } from 'src/app/_models/user';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: post[] = [];
  members: member[] = [];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadAllPosts();
  }

  loadAllPosts(): void {
    this.postService.getAllPosts().subscribe(
      (posts: post[]) => {
        this.posts = posts;
      },
      (error) => {
        console.log('Error fetching posts:', error);
      }
    );
  }

}
