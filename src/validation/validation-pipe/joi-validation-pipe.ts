import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { CreateUserDto } from 'src/components/user/dto/create-user.dto';
import { IUser } from 'src/components/user/schemas/user.schema';
import { createUserSchema } from '../validation-schemas/user-validation.schema';

@Injectable()
// export class JoiValidationPipe implements PipeTransform {
//   constructor(private schema: ObjectSchema) {}

//   transform(value: any, metadata: ArgumentMetadata) {
//     const { error } = this.schema.validate(value);
//     if (error) {
//       throw new BadRequestException('Validation failed');
//     }
//     return value;
//   }
// }
export class UserValidatorPipe implements PipeTransform<IUser, CreateUserDto> {
  public transform(query: IUser, metadata: ArgumentMetadata): CreateUserDto {
    const result = createUserSchema.validate(query, {
      convert: true,
    });

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const validUser = result.value;
    return {
      username: validUser.username,
      first_name: validUser.first_name,
      last_name: validUser.name,
      email: validUser.email,
      phone_number: validUser.phone_number,
    } as CreateUserDto;
  }
}
