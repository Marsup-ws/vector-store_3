import { Injectable, OnModuleInit, Logger, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.seedUsers();
  }

  async seedUsers(): Promise<void> {
    const count = await this.userRepository.count();
    if (count === 0) {
      this.logger.log('No users found in database. Seeding initial users...');
      const initialUsers: Partial<User>[] = [
        {
          login: 'admin',
          password: 'Posche 911',
          email: 'martial.derand.fms@gmail.com',
          rank: 9,
        },
        {
          login: 'mars7up',
          password: 'GhTdK72q',
          email: 'martial.derand.fms@gmail.com',
          rank: 0,
        },
      ];

      await this.userRepository.save(initialUsers);
      this.logger.log(`Successfully seeded ${initialUsers.length} users into PostgreSQL (admin & mars7up).`);
    } else {
      this.logger.log(`Database already contains ${count} users. Skipping user seeding.`);
    }
  }

  async validateUser(loginDto: LoginDto): Promise<{ id: number; login: string; email: string; rank: number }> {
    const { login, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { login } });

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Erreur de saisie');
    }

    return {
      id: user.id,
      login: user.login,
      email: user.email,
      rank: user.rank,
    };
  }

  async recoverPassword(recoverPasswordDto: RecoverPasswordDto): Promise<{ success: boolean; message: string; email?: string }> {
    const { login } = recoverPasswordDto;
    const user = await this.userRepository.findOne({ where: { login } });

    if (!user) {
      throw new NotFoundException(`Utilisateur "${login}" introuvable.`);
    }

    // Simulation et enregistrement de l'envoi de l'email
    this.logger.log(`
============================================================
📧 SIMULATION ENVOI EMAIL DE RÉCUPÉRATION DE MOT DE PASSE 📧
------------------------------------------------------------
Destinataire : ${user.email}
Sujet        : Récupération de votre mot de passe
Contenu      : Bonjour ${user.login},
               Votre mot de passe pour l'application commerciale est :
               => "${user.password}" <=
============================================================
    `);

    return {
      success: true,
      email: user.email,
      message: `Votre mot de passe a été envoyé par email à l'adresse ${user.email}.`,
    };
  }
}
