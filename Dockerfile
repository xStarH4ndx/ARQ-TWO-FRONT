FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que usa Vite para desarrollo
EXPOSE 5173

# Comando para iniciar el servidor dev
CMD ["npm", "run", "dev"]
