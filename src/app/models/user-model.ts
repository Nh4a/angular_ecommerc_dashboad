import { Data } from '@angular/router';

export interface UserModel {
  _id: string;
  createdBy?: string;
  createdVia: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: Data;
  updatedAt: Data;
}

