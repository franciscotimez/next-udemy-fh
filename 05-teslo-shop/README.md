# Next.js Teslo Shop

Reconstruir los modulos de node y levantar la app
```
yarn
yarn dev
```

Para correr localmente se necesita la base de datos
```
docker-compose up -d
```
Mongo DB url local
```
mongodb://localhost:27017/teslodb
```

## configurar variables de entorno.
Renombrar el archivo .env.template

## LLenar la BD
Llamar a: 
```
localhost:3000/api/seed
```