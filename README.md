# Documentación de Diagramas
## 4.1. Diagrama de Arquitectura
El diagrama de arquitectura describe la interacción entre los componentes principales de la
aplicación, que incluye el backend, la base de datos, y el frontend.
### Componentes:- **Frontend (React):**
- Login y autenticación de usuarios.
- Visualización y gestión de datos de clientes.
- Consulta de información meteorológica.- **Backend (Spring Boot 3, Java 21):**
- Control de rutas con Spring Security.
- CRUD para gestión de clientes.
- Consumo de la API de OpenWeatherMap para datos climáticos.
- Conexión a la base de datos MySQL.- **Base de datos (MySQL):**
- Tablas principales:
    - **usuarios**: Manejo de credenciales de autenticación.
    - **clientes**: Gestión de información de clientes.
    - **perfiles**: Control de roles y permisos.- **API de OpenWeatherMap:**
- Provee datos meteorológicos en tiempo real y por ciudad.
### Flujo General:
1. El usuario accede al frontend y se autentica utilizando sus credenciales (ruta: `/api/auth/login`).
2. Si la autenticación es exitosa, el backend verifica las credenciales en cada solicitud mediante
   Basic Auth.
3. El usuario puede:
- Consultar información de clientes (GET: `/api/clientes`).
- Consultar datos meteorológicos (GET: `/api/weather/**`).
4. Si el usuario tiene el perfil de administrador:
- Puede realizar operaciones completas sobre el CRUD de clientes (GET, POST, PUT, DELETE:
  `/api/clientes/**`).
5. La base de datos se utiliza para almacenar y consultar información de usuarios, clientes y
   perfiles.
### Tecnologías:- **Frontend:** React para el diseño.- **Backend:** Spring Boot 3, Java 21, Spring Security, Basic Auth, OpenWeatherMap API.- **Base de datos:** MySQL con alojamiento en cloudclusters.
## 4.2. Diagrama de Secuencia
### Secuencia de Login:
1. El usuario ingresa credenciales en el frontend.
2. El frontend envía las credenciales al backend a través de `/api/auth/login`.
3. El backend valida las credenciales contra la tabla `usuarios` en la base de datos.
4. Si son válidas, el backend permite el acceso a rutas protegidas mediante Basic Auth.
### Secuencia de Consulta de Clientes:
1. El usuario envía una solicitud desde el frontend a `/api/clientes`.
2. El backend verifica las credenciales enviadas mediante Basic Auth.
3. Si las credenciales son válidas:
- Consulta la tabla `clientes` en la base de datos.
- Devuelve los datos al frontend.
4. El frontend muestra los datos al usuario.
### Secuencia de Consulta de Clima:
1. El usuario envía una solicitud desde el frontend a `/api/weather/{ciudad}`.
2. El backend verifica las credenciales enviadas mediante Basic Auth.
3. Si las credenciales son válidas:
- Realiza una solicitud a la API de OpenWeatherMap.
- Devuelve los datos meteorológicos al frontend.
4. El frontend muestra los datos al usuario.
### Secuencia de CRUD de Clientes (Solo Administradores):
1. El administrador envía una solicitud (GET, POST, PUT o DELETE) desde el frontend a
   `/api/clientes/{id}`.
2. El backend verifica las credenciales enviadas mediante Basic Auth.
3. Si las credenciales son válidas y el usuario tiene perfil de administrador:
- Realiza la operación correspondiente en la tabla `clientes` en la base de datos.
- Devuelve el resultado al frontend.
4. El frontend actualiza la interfaz según el resultado.
   **Próximo Paso:** Crear los diagramas gráficos en herramientas como Lucidchart o draw.io,
   basándonos en estas descripciones para representar visualmente los flujos y relaciones entre los
   componentes
 
# Diagrama UML 
![Diagrama uml](https://i.postimg.cc/wv7zsGtc/Diagrama.png)

Imagen completa subida en i.postimg.cc [Diagrama UML](https://i.postimg.cc/wv7zsGtc/Diagrama.png).

## Operaciones API consultar SWAGGER dentro de la carpeta resources 'api-doc.yaml' o visitar [SwaggerHub](https://app.swaggerhub.com/apis/SEBASTIANORELLANA017/public_api_clientes_clima/v3)

# Produccion:

### Repositorios públicos:
* https://github.com/copo017/adminClientes_backend
* https://github.com/copo017/adminClientes_front

### Urls productivas para interactuar con la aplicación:
* https://relaxed-cascaron-ec2b28.netlify.app       <-- usar esta url productiva
* https://adminclientes-front.onrender.com        <-- 2da alternativa pero no recomendada porque render no tiene compatibilidad con react

### Swagger:
* https://app.swaggerhub.com/apis/SEBASTIANORELLANA017/public_api_clientes_clima/v3

### Base de datos:
* Se adjunta un archivo del archivo de la base de datos con todos los script documentados en la raiz del proyecto llamado 'administracion_clientes_fixed.sql'.

## Interfaz de login

- admin3 / pass1234  --> perfil admin
- admin4 / pass1234  --> perfil usuario

![Login](https://i.postimg.cc/tgJwrVX9/login.jpg)

## Interfaz menu de barra

![menu](https://i.postimg.cc/DzNDRyZL/menu.jpg)

## Interfaz clientes

![clientes](https://i.postimg.cc/nr4Ps41G/clientes.jpg)

## Interfaz clima

![clima](https://i.postimg.cc/3JhqsqKS/Clima.jpg)

## Probar en Postman

Por defecto postman no activa las credenciales de autorizacion asi que se debe ingresar la opcion Basic Auth en el apartado de Auhtorization manualmente.
- admin3 / pass1234  --> perfil admin
- admin4 / pass1234  --> perfil usuario

### Postman Clientes
#### Consulta
- `curl --location 'https://adminclientes-backend-ss36.onrender.com/api/clientes' \
--header 'Authorization: ••••••' \
--header 'Cookie: JSESSIONID=3E52F6C398095A6C00BDFB75197D2806'`
#### Consultar id
- `curl --location 'https://adminclientes-backend-ss36.onrender.com/api/clientes/7' \
--header 'Authorization: Basic YWRtaW4zOnBhc3MxMjM0' \
--header 'Cookie: JSESSIONID=3E52F6C398095A6C00BDFB75197D2806'`
#### Crear
- `curl --location 'https://adminclientes-backend-ss36.onrender.com/api/clientes' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic YWRtaW4zOnBhc3MxMjM0' \
--header 'Cookie: JSESSIONID=3E52F6C398095A6C00BDFB75197D2806' \
--data-raw '{
    "nombre":"userProductivo1",
    "email": "productivo1@gmail.con",
    "telefono":"987351173",
    "direccion":"calle productiva11"
}'`
#### Actualizar
- `curl --location --request PUT 'https://adminclientes-backend-ss36.onrender.com/api/clientes/20' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic YWRtaW4zOnBhc3MxMjM0' \
--header 'Cookie: JSESSIONID=3E52F6C398095A6C00BDFB75197D2806' \
--data-raw '{
    "nombre":"userProductivo1",
    "email": "productivo1@gmail.con",
    "telefono":"987351173",
    "direccion":"calle productiva11111"
}'`
#### Borrar
- `curl --location --request DELETE 'https://adminclientes-backend-ss36.onrender.com/api/clientes/20' \
--header 'Authorization: Basic YWRtaW4zOnBhc3MxMjM0' \
--header 'Cookie: JSESSIONID=3E52F6C398095A6C00BDFB75197D2806'`

### Postman Clima

- `curl --location 'https://adminclientes-backend-ss36.onrender.com/api/weather?city=Santiago' \
--header 'Authorization: Basic YWRtaW4zOnBhc3MxMjM0' \
--header 'Cookie: JSESSIONID=3E52F6C398095A6C00BDFB75197D2806'`