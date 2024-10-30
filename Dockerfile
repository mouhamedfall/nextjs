# Utilise une image Node.js comme base
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Compiler l'application pour la production
RUN npm run build

# Exposer le port 3000 pour l'application
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "run", "start"]
