"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = UsersService_1 = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async onModuleInit() {
        await this.seedUsers();
    }
    async seedUsers() {
        const count = await this.userRepository.count();
        if (count === 0) {
            this.logger.log('No users found in database. Seeding initial users...');
            const initialUsers = [
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
        }
        else {
            this.logger.log(`Database already contains ${count} users. Skipping user seeding.`);
        }
    }
    async validateUser(loginDto) {
        const { login, password } = loginDto;
        const user = await this.userRepository.findOne({ where: { login } });
        if (!user || user.password !== password) {
            throw new common_1.UnauthorizedException('Erreur de saisie');
        }
        return {
            id: user.id,
            login: user.login,
            email: user.email,
            rank: user.rank,
        };
    }
    async recoverPassword(recoverPasswordDto) {
        const { login } = recoverPasswordDto;
        const user = await this.userRepository.findOne({ where: { login } });
        if (!user) {
            throw new common_1.NotFoundException(`Utilisateur "${login}" introuvable.`);
        }
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map