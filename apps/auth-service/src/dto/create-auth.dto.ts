import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class SingIn {
  @ApiProperty({ example: 'user@example.com', required: true, type: String })
  @IsEmail({}, { message: 'Please provide a valid Email' })
  @IsNotEmpty({ message: 'Please provide a valid Email' })
  email: string;

  @ApiProperty({ example: 'Password@123', required: true, type: String })
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]).{6,}$/,
    {
      message:
        'Password must be 6-15 characters long, include at least 1 uppercase letter, 1 number, and 1 special character',
    },
  )
  password: string;
}

export class CreateAuthDto {
  // @ApiProperty({ example: 'John Doe', required: true, type: String })
  @IsNotEmpty({ message: 'Name is required' })
  username: string;

  // @ApiProperty({ example: 'user@example.com', required: true, type: String })
  @IsEmail({}, { message: 'Please provide a valid Email' })
  @IsNotEmpty({ message: 'Please provide a valid Email' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Provider must be a string' })
  provider?: string = 'credentials';

  // @ApiProperty({ example: 'Password@123', required: true, type: String })
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>, .?/~`]).{6,}$/,
    {
      message:
        'Password must be 6-15 characters long, include at least 1 uppercase letter, 1 number, and 1 special character',
    },
  )
  password: string;
}
