import {Component, inject, OnInit} from '@angular/core';
import {RoleResponse} from "../../../responses/role/role.response.dto";
import {RoleService} from "../../../services/role.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [],
  templateUrl: './role-admin.component.html',
  styleUrl: './role-admin.component.scss'
})
export class RoleAdminComponent implements OnInit {

  roles: RoleResponse[] = [];

  roleService = inject(RoleService);
  router = inject(Router);
  toastr = inject(ToastrService);


  ngOnInit(): void {
    this.getRoles();
  }

  private getRoles() {
    this.roleService.getRoles().subscribe({
      next: (response) => {
        this.roles = response;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  updateRole(id: number) {
    this.router.navigate([`/admin/roles/update/${id}`]);
  }

  createRole() {
    this.router.navigate(['/admin/roles/create']);
  }


  deleteRole(id: number) {
    const confirmation = window
      .confirm('Are you sure you want to delete this role?');
    if (!confirmation) {
      return;
    }
    this.roleService.deleteRoleById(id).subscribe({
      next: (response) => {
        this.getRoles();
        this.toastr.success("Deleted role successfully!");
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
