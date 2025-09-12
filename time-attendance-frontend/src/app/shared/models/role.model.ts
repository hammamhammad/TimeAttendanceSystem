export interface Role {
  id: number;
  name: string;
  isSystem: boolean;
  isEditable: boolean;
  isDeletable: boolean;
  userCount: number;
  createdAtUtc: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  key: string;
  group: string;
  description: string;
}

export interface AssignPermissionRequest {
  permissionId: number;
}