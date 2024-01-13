import {Component, ViewChild, OnInit} from '@angular/core';
import {LoginDTO} from '../../dtos/user/login.dto';
import {UserService} from '../../services/user.service';


import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {UserResponse} from "../../responses/user/user.response";
import {Role} from "../../dtos/user/role";
import {LoginResponse} from "../../responses/user/login.response";
import {TokenService} from "../../services/token.service";
import {RoleService} from "../../services/role.service";
import {CartService} from "../../services/cart.service";

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

  phoneNumber = '0363898571';
  password = '123456';
  showPassword: boolean = false;

  roles: Role[] = []; // Mảng roles
  rememberMe = true;
  // selectedRole: Role | undefined; // Biến để lưu giá trị được chọn từ dropdown
  userResponse?: UserResponse

  onPhoneNumberChange() {
    console.log(`Phone typed: ${this.phoneNumber}`);
    //how to validate ? phone must be at least 6 characters
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService,
    private cartService: CartService
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
    const message = `phone: ${this.phoneNumber}` +
      `password: ${this.password}`;
    //alert(message);
    debugger

    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
    };
    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        const {token} = response;
        if (this.rememberMe) {
          this.tokenService.setToken(token);
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
