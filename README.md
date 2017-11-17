# Mi primer microservicio con AWS
Ejemplos para aprender ES6 (Su entorno de desarrollo, babel, eslint, yarn) y AWS (serverless)

## Estructura del directorio
```
/
...Estarán los archivos como
- package.json
- .gitignore
- .eslintrc
- .babelrc
/src
...Estarán todos los archivos que vamos a ir escribiendo
/compiled
...Estarán todas los archivos que se compilan a partir del directorio src
/test
...Directorio de nuestras pruebas unitarias
```
## Primera parte
Creación del archivo `datos.json` que contendrá la data a solicitar el archivo `/src/index.js` con el contenido inicial y la función para el test.
Crearemos la primera función de *lambda AWS* y veremos su estructura
### Veremos las funciones asincronas y cómo podemos utilizar async/await para tener mayor control y legibilidad en nuestro código