# Next.js OpenJira App

Para correr localmente se necesita la base de datos
```
docker-compose up -d
```
Mongo DB url local
```
mongodb://localhost:27017/entriesdb
```

## configurar variables de entorno.
Renombrar el archivo .env.template

## LLenar la BD
Llamar a: 
```
localhost:3000/api/seed
```