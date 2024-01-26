export interface RoleDto {
  name: string;
  description: string;
  active: boolean;
  permissions: PermissionDto[];
}

export interface PermissionDto {
  id: number;
  enabled: boolean;
}
