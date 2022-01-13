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

  /**
   * Binding input values to userData object
   */
  @Input() userData = {
    Username: this.user.Username, 
    Password: this.user.Password, 
    Email: this.user.Email, 
    Birthday: this.user.Birthday
  };

  /**
   * Constructor items are documents as properties
   * @ignore
   * @param fetchApiData 
   * @param dialogRef 
   * @param snackBar 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Initiliazes the component
   * @ignore
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Retrieves userData from localStorage
   */
  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }

  /**
   * Updates the infor of the user, sneding the data to the backend.
   * A snack bar element is shown, contianing the result of the operation
   */
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
}
