import { BaseEntity } from '@core/config/base.entity';

export interface Role extends BaseEntity {
	roleId: number;
	name: string;
}
