import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";
import {RoleResponse} from "../../../../responses/role/role.response.dto";
import {RoleService} from "../../../../services/role.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-role-update',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    NgbCollapse
  ],
  templateUrl: './role-update.component.html',
  styleUrl: './role-update.component.scss'
})
export class RoleUpdateComponent implements OnInit {

  role: RoleResponse = {
    id: 0,
    name: '',
    active: false,
    description: '',
    groupedPermissions: {}
  }
  modules: string[] = [];
  roleId = 0;

  roleService = inject(RoleService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roleId = Number(params.get('id'));
      this.getRoleDetails();
    });
  }

  togglePermission(permission: any) {
    // Logic to handle permission toggle
    console.log(permission.name, permission.enabled);
    // You would typically call a service to update the permission status here
  }

  private getRoleDetails() {
    this.roleService.getRoleById(this.roleId).subscribe({
      next: (response) => {
        this.role = response;
        this.modules = Array.from(Object.keys(response.groupedPermissions))
      },
      error: (err: any) => {
        console.log(err);
      }
    })

  }

  save() {
    console.log(this.role)
  }
}
