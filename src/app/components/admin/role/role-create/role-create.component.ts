import {Component, inject} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GroupedPermissions, RoleResponse} from "../../../../responses/role/role.response.dto";
import {RoleService} from "../../../../services/role.service";
import {ToastrService} from "ngx-toastr";
import {RoleDto} from "../../../../dtos/role/role.dto";

@Component({
  selector: 'app-role-create',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './role-create.component.html',
  styleUrl: './role-create.component.scss'
})
export class RoleCreateComponent {

  groupedPermissions!: GroupedPermissions

  modules: string[] = [];

  roleService = inject(RoleService);
  toastr = inject(ToastrService);

  role: RoleDto = {
    name: '',
    active: false,
    description: '',
    permissions: []
  }
  ngOnInit(): void {
    this.getGroupedPermissions();
  }

  togglePermission(permission: any) {
    // Logic to handle permission toggle
    console.log(permission.name, permission.enabled);
    // You would typically call a service to update the permission status here
  }

  save() {
    this.role.permissions = Object.values(this.groupedPermissions).flat()
    this.roleService.createRole(this.role).subscribe({
      next: (response) => {
        this.toastr.success("Created role successfully!");
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  private getGroupedPermissions() {
    this.roleService.getGroupedPermission().subscribe({
      next: (response) => {
        this.groupedPermissions = response;
        this.modules = Array.from(Object.keys(response))
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
