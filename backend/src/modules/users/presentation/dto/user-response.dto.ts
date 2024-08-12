import { OmitType } from '@nestjs/mapped-types';
import { UserModel } from '@users/business/models/user.model';

export class UserResponseDto extends OmitType(UserModel, ['password'] as const) {
    
}
