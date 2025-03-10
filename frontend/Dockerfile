FROM node:18

WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# Expose the port for frontend
EXPOSE 5173

# Command to serve the build folder
CMD ["npm", "run", "dev"]