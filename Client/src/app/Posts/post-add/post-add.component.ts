import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addpost } from 'src/app/_models/AddPost';
import { AccountService } from 'src/app/_services/account.service';
import { ClinicService } from 'src/app/_services/clinic.service';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css'],
})
export class PostAddComponent implements OnInit {
  ngOnInit(): void {
    this.initializeForm();
  }
  registerForm: FormGroup = new FormGroup({});
  ValidationErrors: string[] | undefined;
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private postService: PostService,
    private clinicService: ClinicService
  ) {}
  initializeForm() {
    this.registerForm = this.fb.group({
      description: ['', Validators.required],
    });
  }
  register() {
    const formValue = this.registerForm.getRawValue(); // Use getRawValue to include disabled controls
    this.postService.addPost(formValue).subscribe({
      next: () => this.router.navigateByUrl('/clinicDashbord'),
    });
  }
}
