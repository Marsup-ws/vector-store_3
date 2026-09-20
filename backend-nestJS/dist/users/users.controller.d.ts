import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        user: {
            id: number;
            login: string;
            email: string;
            rank: number;
        };
    }>;
    recoverPassword(recoverPasswordDto: RecoverPasswordDto): Promise<{
        success: boolean;
        message: string;
        email?: string;
    }>;
}
