import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Schedule } from 'src/app/_models/Schedule';
import { user } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ClinicService } from 'src/app/_services/clinic.service';
@Component({
  selector: 'app-member-view-schedule',
  templateUrl: './member-view-schedule.component.html',
  styleUrls: ['./member-view-schedule.component.css'],
})
export class MemberViewScheduleComponent implements OnInit {
  schedules: Schedule[] = [];
  user: user | undefined;
  constructor(
    private clinicalService: ClinicService,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          this.getAllScheduleByUserName(this.user.userName);
        }
      },
    });
    console.log(this.user);
  }
  getAllScheduleByUserName(clinicUserName: string) {
    this.clinicalService.getScheduleByUserName(clinicUserName).subscribe({
      next: (schedules) => {
        if (schedules) {
          this.schedules = schedules;
        }
      },
    });
  }
}
