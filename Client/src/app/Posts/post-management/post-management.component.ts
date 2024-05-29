import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { post } from 'src/app/_models/post';
import { user } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.css'],
})
export class PostManagementComponent implements OnInit {
  posts: post[] = [];
  currentUser: user | undefined;
  selectedPost: post | undefined;
  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.currentUser = user;
          this.getPostsByUsername(this.currentUser.userName);
        }
      },
    });
  }
  constructor(
    private postService: PostService,
    private accountService: AccountService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe({
      next: (_) => (this.posts = this.posts.filter((post) => post.id !== id)),
    });
  }

  getPostsByUsername(username: string): void {
    this.postService.getPostsByUsername(username).subscribe(
      (response: post[]) => {
        this.posts = response;
      },
      (error) => {
        this.toastService.error('Error fetching posts:');
      }
    );
  }

  editPost(post: post): void {
    this.router.navigate(['/clinicDashbord/edit-post'], { state: { post } });
  }
}
