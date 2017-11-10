# Ejemplo para el parendizaje
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

## Segunda parte
### 1
Se crean las funciones con las características mas usadas de ES6 para repasar y ver su utilidad, y se demuestra cómo y por qué ya no es tan indispensable usar librerias externas que hace más pesado nuestro código.
### 2 yarn y babel (algo de git y npm)
Iniciamos un proyecto con yarn 
```
yarn init
```
posteriormente agregamos los paquetes que usaremos por el momento, para este caso son los paquetes de babel porque transpileramos nuestro código a un código "legible" para todos los buscadores o los buscadores más viejos, aunque en nuestro caso será para NodeJS, que también depende de qué versión tengamos así mismo tendrá o no soporte para algún ECMA de JS.
```
yarn add babel-cli babel-core babel-plugin-async-to-promises babel-plugin-transform-object-assign babel-preset-es2015 -D
```
El _flag_ `-D` se refiere a que todos queden en *devDependencies* en nuestro package.json. En el caso de tener ya el archivo _package.json_ con todas las dependencias a utilizar, podemos instalarlas solo con
```
yarn
```
Por último añadimos el comando `babel src --watch --out-dir compiled` que nos servirá para hacer la transpilación de nuestros archivos en _src_

## Tercera parte
Se crea una clase que realizará todo el procesamiento de datos, se crea una función estática de esta, su constructor y las funciones anteriores que procesaban los datos quedan como prototipos de la clase creada.
Además al correr el babel-cli se transpilan todos los archivos y se puede usar internamente _import_ en node, puesto que es transpilado