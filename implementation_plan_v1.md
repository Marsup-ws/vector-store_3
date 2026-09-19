# Plan d'implémentation : Migration Monorepo, Backend NestJS et PostgreSQL

Ce plan définit l'architecture et les étapes pour transformer l'application commerciale en monorepo containerisé avec Docker. Les produits (actuellement chargés depuis `products.json` dans Next.js) seront déplacés dans une base PostgreSQL et exposés par une API REST NestJS.

---

## User Review Required

> [!IMPORTANT]
> - **Ports par défaut** : 
>   - **Frontend (Next.js)** : Port `3000`
>   - **Backend (Nest.js)** : Port `4000` (API accessible sur `http://localhost:4000/api`)
>   - **Base de données (PostgreSQL)** : Port `5432`
> - **Seeding des données** : Lors du premier démarrage du backend NestJS, si la table `products` est vide, les produits initiaux de `products.json` seront automatiquement insérés dans la base de données.

---

## Architecture Monorepo & Services Docker

```
App commerciale (Monorepo)
├── docker-compose.yml
├── frontend-nextJS/
│   ├── Dockerfile
│   └── app/store/page.tsx (fetch API NestJS)
└── backend-nestJS/
    ├── Dockerfile
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── main.ts
        ├── app.module.ts
        └── products/
            ├── entities/product.entity.ts
            ├── dto/create-product.dto.ts
            ├── products.controller.ts
            ├── products.service.ts
            └── products.module.ts
```

---

## Proposed Changes

### Docker Orchestration (Racine du Monorepo)

#### [NEW] [docker-compose.yml](file:///c:/Users/mgcan/Workspace/_++%20Workspace++_/App%20commerciale/docker-compose.yml)
- Définition des services `postgres_db`, `backend` (NestJS) et `frontend` (Next.js).
- Configuration du réseau et des volumes de persistance de la base SQL.
- Variables d'environnement pour l'interconnexion entre les conteneurs.

#### [NEW] [.env.example](file:///c:/Users/mgcan/Workspace/_++%20Workspace++_/App%20commerciale/.env.example)
- Définition des clés d'environnement type (`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `BACKEND_PORT`, `NEXT_PUBLIC_API_URL`).

---

### Backend NestJS

#### [NEW] [backend-nestJS/package.json](file:///c:/Users/mgcan/Workspace/_++%20Workspace++_/App%20commerciale/backend-nestJS/package.json)
- Configuration NestJS (`@nestjs/core`, `@nestjs/common`, `@nestjs/typeorm`, `typeorm`, `pg`, `class-validator`, `class-transformer`).

#### [NEW] [backend-nestJS/Dockerfile](file:///c:/Users/mgcan/Workspace/_++%20Workspace++_/App%20commerciale/backend-nestJS/Dockerfile)
- Image Docker multi-stage optimisée pour compiler et exécuter l'API NestJS.

#### [NEW] [backend-nestJS/src/main.ts](file:///c:/Users/mgcan/Workspace/_++%20Workspace++_/App%20commerciale/backend-nestJS/src/main.ts)
- Initialisation du serveur NestJS sur le port `4000`, configuration de CORS et du préfixe `/api`.

#### [NEW] [backend-nestJS/src/products/entities/product.entity.ts](file:///c:/Users/mgcan/Workspace/_++%20Workspace++_/App%20commerciale/backend-nestJS/src/products/entities/product.entity.ts)
- Entité TypeORM `Product` reprenant les champs du type TypeScript (`id`, `title`, `name`, `price`, `image`, `img`, `origin`, `originLabel`, `originBadgeColor`, `category`, `categoryLabel`, `type`).

#### [NEW] [backend-nestJS/src/products/products.service.ts](file:///c:/Users/mgcan/Workspace/_++%20Workspace++_/App%20commerciale/backend-nestJS/src/products/products.service.ts)
- Méthodes métier : `findAll()`, `findOne(id)`, `create()`, `update()`, `remove()`.
- Seeding automatique au démarrage si la table `products` est vide (import des données initiales).

#### [NEW] [backend-nestJS/src/products/products.controller.ts](file:///c:/Users/mgcan/Workspace/_++%20Workspace++_/App%20commerciale/backend-nestJS/src/products/products.controller.ts)
- Routes REST (`GET /api/products`, `GET /api/products/:id`, `POST /api/products`, etc.).

---

### Frontend Next.js

#### [MODIFY] [frontend-nextJS/app/store/page.tsx](file:///c:/Users/mgcan/Workspace/_++%20Workspace++_/App%20commerciale/frontend-nextJS/app/store/page.tsx)
- Remplacement de l'import statique `products.json` par un appel dynamique `fetch` vers l'API NestJS (`/api/products`).
- Ajout d'un état de chargement et de gestion des erreurs de connexion backend.

#### [MODIFY] [frontend-nextJS/Dockerfile](file:///c:/Users/mgcan/Workspace/_++%20Workspace++_/App%20commerciale/frontend-nextJS/Dockerfile)
- Adaptation pour supporter `NEXT_PUBLIC_API_URL` au moment du build/runtime.

---

## Verification Plan

### Automated Tests & Verification Commands
1. **Initialisation des packages backend** :
   ```bash
   cd "backend-nestJS" && npm install
   ```
2. **Build Docker Compose** :
   ```bash
   docker-compose build
   ```
3. **Démarrage de l'infrastructure Docker** :
   ```bash
   docker-compose up -d
   ```
4. **Vérification API Rest Backend** :
   - Tester l'endpoint HTTP GET `http://localhost:4000/api/products` (doit retourner la liste JSON des 15 produits seedés depuis Postgres).
5. **Vérification Frontend Store** :
   - Accéder à `http://localhost:3000/store` et vérifier l'affichage dynamique des produits issus du backend NestJS.
