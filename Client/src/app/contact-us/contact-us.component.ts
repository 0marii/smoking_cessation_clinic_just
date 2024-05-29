import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addpost } from 'src/app/_models/AddPost';
import { AccountService } from 'src/app/_services/account.service';
import { ClinicService } from 'src/app/_services/clinic.service';
import { PostService } from 'src/app/_services/post.service';
import { FeedbackService } from '../_services/feedback.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
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
    private clinicService: ClinicService,
    private feedbackService: FeedbackService
  ) {}
  initializeForm() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      content: ['', Validators.required],
    });
  }
  register() {
    const formValue = this.registerForm.getRawValue();
    this.feedbackService.addFeedback(formValue).subscribe({
      next: () => this.router.navigateByUrl('/'),
    });
  }
}
