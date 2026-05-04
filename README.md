# Auth - OAuth avec NextAuth + Prisma + Supabase

Application d'authentification moderne avec Next.js 16, NextAuth.js, Prisma et Supabase PostgreSQL. Projet d'apprentissage full-stack démontrant l'intégration complète de l'authentification OAuth avec une base de données PostgreSQL.

## Fonctionnalités

- **Authentification OAuth** via Google et GitHub
- **Base de données PostgreSQL** avec Supabase
- **ORM Prisma** pour la gestion des données
- **Interface moderne** avec design sombre et responsive
- **Sessions persistantes** gérées automatiquement
- **Dashboard utilisateur** avec profil et informations
- **TypeScript** pour la sécurité du code
- **Tailwind CSS** pour le styling

## Stack Technique

- **Framework**: Next.js 16.2.4 (App Router)
- **Authentification**: NextAuth.js 4.24.14
- **Base de données**: PostgreSQL (Supabase)
- **ORM**: Prisma 7.8.0
- **Styling**: Tailwind CSS 4
- **Icons**: React Icons 5.6.0
- **Langage**: TypeScript 5

## Prérequis

### Avant de commencer
- **Node.js 18+** installé sur votre machine
- **npm** ou **yarn** comme gestionnaire de paquets
- **Compte Supabase** avec base de données PostgreSQL
- **OAuth applications** Google et GitHub configurées
- **Git** pour cloner le repository

## Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd auth
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env
   ```

4. **Remplir le fichier `.env`** avec vos clés :
   ```env
   # Supabase
   DATABASE_URL="postgresql://postgres:[MOT-DE-PASSE]@db.xxxxxxxxxxxx.supabase.co:5432/postgres"
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=une-chaine-aleatoire-longue-ici
   
   # Google OAuth
   GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=xxxxx
   
   # GitHub OAuth
   GITHUB_CLIENT_ID=xxxxx
   GITHUB_CLIENT_SECRET=xxxxx
   ```

5. **Initialiser la base de données**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

   Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure de la Base de Données

Le schéma Prisma inclut 4 tables principales :

- **User**: Informations des utilisateurs (nom, email, avatar)
- **Account**: Comptes OAuth liés (Google, GitHub)
- **Session**: Sessions actives des utilisateurs
- **VerificationToken**: Tokens de vérification email

## Structure du Projet

```
auth/
├── app/
│   ├── api/auth/[...nextauth]/    # Configuration NextAuth
│   ├── dashboard/                 # Page utilisateur protégée
│   ├── layout.tsx                 # Layout principal
│   ├── page.tsx                   # Page de connexion
│   └── SessionWrapper.tsx         # Provider de session
├── lib/
│   └── prisma.ts                  # Client Prisma
├── prisma/
│   └── schema.prisma              # Schéma de la BDD
└── public/                        # Assets statiques
```

## Configuration OAuth

### Google OAuth
1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet
3. Activez l'API Google+ 
4. Créez des identifiants OAuth 2.0
5. Ajoutez `http://localhost:3000/api/auth/callback/google` comme URI de redirection

### GitHub OAuth
1. Allez sur [GitHub Developer Settings](https://github.com/settings/developers)
2. Créez une nouvelle OAuth App
3. Ajoutez `http://localhost:3000/api/auth/callback/github` comme Authorization callback URL

## Pages de l'Application

### Page de Connexion (`/`)
- Interface moderne avec design sombre
- Boutons de connexion Google et GitHub
- Responsive et accessible

### Dashboard (`/dashboard`)
- Profil utilisateur avec avatar
- Informations du compte (email, nom)
- Badge indiquant le provider OAuth
- Bouton de déconnexion

## Déploiement

### Vercel (Recommandé)
```bash
npm run build
```

Déployez sur Vercel avec les variables d'environnement configurées.

### Autres plateformes
Assurez-vous de configurer :
- `NEXTAUTH_URL` avec l'URL de production
- `DATABASE_URL` avec votre BDD PostgreSQL
- Les clés OAuth des providers

## Commandes Utiles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Démarrer le serveur de production
npm start

# Linter
npm run lint

# Génération Prisma
npx prisma generate

# Synchroniser la BDD
npx prisma db push

# Studio Prisma (interface visuelle)
npx prisma studio
```

## Notes de Développement

- L'application utilise le **App Router** de Next.js 13+
- Les sessions sont gérées automatiquement par NextAuth avec Prisma Adapter
- Le design utilise **Tailwind CSS** avec un thème sombre personnalisé
- Les composants sont écrits en **TypeScript** pour la sécurité du type
- La navigation côté client utilise `next/navigation` et `next-auth/react`

## Contribuer

### Comment contribuer
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Guidelines
- Respectez la convention de nommage existante
- Ajoutez des commentaires si nécessaire
- Testez vos modifications avant de soumettre

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Contact

Pour toute question ou suggestion, n'hésitez pas à contacter :
- Créateur du projet
- Ouvrir une issue sur GitHub

---

**Réalisé avecNext.js, NextAuth.js, Prisma et Supabase**
