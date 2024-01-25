export interface Permission {
  id: number;
  name: string;
  path: string;
  method: string;
  module: string;
  enabled: boolean;
}

interface GroupedPermissions {
  [key: string]: Permission[];
}

export interface RoleResponse {
  id: number;
  name: string;
  description: string;
  active: boolean;
  groupedPermissions: GroupedPermissions
}
