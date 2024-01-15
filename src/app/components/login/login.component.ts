import {Component, ViewChild, OnInit} from '@angular/core';
import {LoginDTO} from '../../dtos/user/login.dto';
import {UserService} from '../../services/user.service';


import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {Router} from "@angular/router";
import {UserResponse} from "../../responses/user/user.response";
import {Role} from "../../dtos/user/role";
import {LoginResponse} from "../../responses/user/login.response";
import {StorageService} from "../../services/storage.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    FormsModule
  ]
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;

  email = 'lmthong98@gmail.com';
  password = '123456';
  showPassword: boolean = false;

  roles: Role[] = []; // Mảng roles
  rememberMe = true;
  // selectedRole: Role | undefined; // Biến để lưu giá trị được chọn từ dropdown
  userResponse?: UserResponse

  onPhoneNumberChange() {
    console.log(`Phone typed: ${this.email}`);
    //how to validate ? phone must be at least 6 characters
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private tokenService: StorageService
  ) {
  }

  ngOnInit() {

  }

  createAccount() {
    debugger
    // Chuyển hướng người dùng đến trang đăng ký (hoặc trang tạo tài khoản)
    this.router.navigate(['/register']);
  }

  login() {
    const message = `email: ${this.email}` +
      `password: ${this.password}`;
    //alert(message);
    debugger

    const loginDTO = new LoginDTO(this.email, this.password);
    this.authService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger
        const {token, refreshToken} = response;
        if (this.rememberMe) {
          this.tokenService.setAccessToken(token);
          this.tokenService.setRefreshToken(refreshToken)
          this.userService.getUserDetail().subscribe({
            next: (response: any) => {
              debugger
              this.userResponse = {
                ...response,
                date_of_birth: new Date(response.date_of_birth),
              };
              this.userService.saveUserResponseToLocalStorage(this.userResponse);
              if (this.userResponse?.role.name == 'ADMIN') {
                console.log("navigate to admin page")
                // this.router.navigate(['/admin']);
              } else if (this.userResponse?.role.name == 'USER') {
                this.router.navigate(['/']);
              }
            },
            complete: () => {
              // this.cartService.refreshCart();
              // debugger;
            },
            error: (error: any) => {
              debugger;
              alert(error.error.message);
            }
          })
        }
      },
      complete: () => {
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message);
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
