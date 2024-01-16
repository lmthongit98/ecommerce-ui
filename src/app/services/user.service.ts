import {Inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserResponse} from "../responses/user/user.response";
import {UpdateUserDTO} from "../dtos/user/update.user.dto";
import {DOCUMENT} from "@angular/common";
import {RegisterDTO} from "../dtos/user/register.dto";
import {Observable} from "rxjs";
import {HttpUtilService} from "./http.util.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiUserDetail = `${environment.apiBaseUrl}/users/details`;
  localStorage?: Storage;

  private apiConfig = {
    headers: this.httpUtilService.createHeaders(),
  }

  constructor(
    private http: HttpClient,
    private httpUtilService: HttpUtilService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }


  getUserId() {
    const user = this.getUserResponseFromLocalStorage();
    return user?.id;
  }

  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
  }

  getUserDetail() {
    return this.http.get(this.apiUserDetail)
  }

  updateUserDetail(token: string, updateUserDTO: UpdateUserDTO) {
    debugger
    let userResponse = this.getUserResponseFromLocalStorage();
    return this.http.put(`${this.apiUserDetail}/${userResponse?.id}`, updateUserDTO)
  }

  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      debugger
      if (userResponse == null || !userResponse) {
        return;
      }
      // Convert the userResponse object to a JSON string
      const userResponseJSON = JSON.stringify(userResponse);
      // Save the JSON string to local storage with a key (e.g., "userResponse")
      this.localStorage?.setItem('user', userResponseJSON);
      console.log('User response saved to local storage.');
    } catch (error) {
      console.error('Error saving user response to local storage:', error);
    }
  }

  getUserResponseFromLocalStorage(): UserResponse | null {
    try {
      // Retrieve the JSON string from local storage using the key
      const userResponseJSON = this.localStorage?.getItem('user');
      if (!userResponseJSON) {
        return null;
      }
      // Parse the JSON string back to an object
      const userResponse = JSON.parse(userResponseJSON!);
      console.log('User response retrieved from local storage.');
      return userResponse;
    } catch (error) {
      console.error('Error retrieving user response from local storage:', error);
      return null; // Return null or handle the error as needed
    }
  }

  removeUserFromLocalStorage(): void {
    try {
      // Remove the user data from local storage using the key
      this.localStorage?.removeItem('user');
      console.log('User data removed from local storage.');
    } catch (error) {
      console.error('Error removing user data from local storage:', error);
      // Handle the error as needed
    }
  }
}
