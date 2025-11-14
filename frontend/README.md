# Título del Proyecto

TP Integrador

## Descripción breve

ToDo App con React (frontend) y Node.js/Express (backend).

## Instrucciones de instalación

1. Clona el repositorio:
   ```sh
   git clone <https://github.com/gonzalolrodriguez/trabajo-practico-integrador-2-gonzalo-rodriguez.git>
   ```
2. Instala dependencias en el frontend:
   ```sh
   cd frontend
   npm install
   ```
3. Instala dependencias en el backend:
   ```sh
   cd ../backend
   npm install
   ```

## Configuración del archivo .env

Crea un archivo `.env` en la carpeta `backend` con el siguiente contenido de ejemplo:

```
DB_NAME=tp_integrador
DB_USER=
DB_PASSWORD=
DB_HOST=localhost
DB_DIALECT=mysql
DB_PORT=3306
JWT_SECRET=jwt_secret
PORT=3000
```

Ajusta los valores según tu entorno local.
