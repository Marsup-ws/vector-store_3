import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';
export declare class UsersService implements OnModuleInit {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>);
    onModuleInit(): Promise<void>;
    seedUsers(): Promise<void>;
    validateUser(loginDto: LoginDto): Promise<{
        id: number;
        login: string;
        email: string;
        rank: number;
    }>;
    recoverPassword(recoverPasswordDto: RecoverPasswordDto): Promise<{
        success: boolean;
        message: string;
        email?: string;
    }>;
}
