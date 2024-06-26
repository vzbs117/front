import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { Location } from '@angular/common';

interface UserData {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user$: Observable<firebase.User | null>;
  wordBalance = 5000;
  editMode = false;
  userData: UserData = { displayName: null, email: null, photoURL: null };

  constructor(
    private afAuth: AngularFireAuth,
    private location: Location
  ) {
    this.user$ = this.afAuth.authState;
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.userData.displayName = user.displayName;
        this.userData.email = user.email;
        this.userData.photoURL = user.photoURL;
      }
    });
  }

  logout(): void {
    this.afAuth.signOut().then(() => {
      // Logout successful, optionally redirect or perform other operations
    }).catch((error) => {
      console.error('Logout error', error);
    });
  }

  goBack(): void {
    this.location.back();
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.userData = { ...this.userData };
    }
  }

  saveChanges(): void {
    this.editMode = false;
    const user = firebase.auth().currentUser;
    if (user && this.userData.displayName !== null && this.userData.photoURL !== null) {
      user.updateProfile({
        displayName: this.userData.displayName,
        photoURL: this.userData.photoURL
      }).then(() => {
        console.log('User profile updated successfully');
      }).catch((error) => {
        console.error('Error updating profile:', error);
      });
    }
  }

  cancelEdit(): void {
    this.editMode = false;
  }
}
