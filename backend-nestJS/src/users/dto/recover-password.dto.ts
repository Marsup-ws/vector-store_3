import { IsString, IsNotEmpty } from 'class-validator';

export class RecoverPasswordDto {
  @IsString()
  @IsNotEmpty()
  login: string;
}
