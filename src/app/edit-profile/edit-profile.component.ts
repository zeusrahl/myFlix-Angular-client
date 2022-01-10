import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user: any = {};

  @Input() userData = {
    Username: this.user.Username, 
    Password: this.user.Password, 
    Email: this.user.Email, 
    Birthday: this.user.Birthday
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }

  editUserProfile(): void {
    const updatedUserData = {
      Username: !this.userData.Username
        ? this.user.Username
        : this.userData.Username,
      Password: !this.userData.Password
        ? this.user.Password
        : this.userData.Password,
      Email: !this.userData.Email ? this.user.Email : this.userData.Email,
      Birthday: !this.userData.Birthday
        ? this.user.Birthday
        : this.userData.Birthday,
    };
    this.fetchApiData.editUser(updatedUserData).subscribe((result: any) => {
      console.log(result);
      this.dialogRef.close();
      this.snackBar.open("You have updated your profile", "OK", {
        duration: 4000
      });
      localStorage.setItem('user', result.Username);
    }), (result: any) => {
      console.log(result);
      this.snackBar.open('Something went wrong. Please try again', 'OK', {
        duration: 4000
      });
    }
  }


  // loginUser(): void {
  //   this.fetchApiData.userLogin(this.userData).subscribe((result) => {
  //     this.dialogRef.close();
  //     console.log(result);
  //     this.snackBar.open("You are now logged in", 'OK', {
  //       duration: 4000
  //     });
  //     this.router.navigate(['movies']);
  //   }, (result) => {
  //     console.log(result)
  //     this.snackBar.open("Something went wrong", 'OK', {
  //       duration: 4000
  //     });
  //   });
  // }
}
