import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { post } from 'src/app/_models/post';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  post: post | undefined;
  constructor(
    private router: Router,
    private postService: PostService,
    private toastr: ToastrService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.post = navigation.extras.state['post'];
    }
  }

  updatePost(): void {
    if (this.post) {
      console.log(this.post);
      this.postService.updatePost(this.post).subscribe({
        next: () => {
          this.toastr.success('Post updated successfully');
          this.router.navigateByUrl('/clinicDashbord');
        },
        error: (error) => {
          this.toastr.error('Error updating post');
        },
      });
    }
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.post = navigation.extras.state['post'];
    }
  }
}
