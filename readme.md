## Task  List ##

Aplicación creada con Node.js para crear y eliminar tareas utilizando el modulo "readline" para interactuar con el usuario desde la consola!

![menu-bienvenida](images/menu-bienvenida.JPG)

## Funcionalidades 

1. Crear Tareas
![agregar tarea](/images/addTask.JPG)
2. Eliminar Tareas
![eliminar tarea](/images/deleteTask.JPG)
3. Completar Tareas
![completar tarea](/images/completeTask.JPG)
4. Ver Lista de Tareas
![ver lista de tareas](/images/verTask.JPG)
## Requisitos 

- Node.js instalado

## Instalación

1. Clonar este repositorio:
``` 
git clone <https://github.com/mrestrepoj2/server-node>
``` 
2. Acceder al directorio:
```
cd task-list-node
```
3. Instalar dependencias:
```
npm chalk
```
chalk
```
npm install chalk
```
## Uso

Para poder usar la app, usa el siguiente comando en la terminal:
```
node tasks.js
```

A continuación, aparecerá un menú con las opciones disponibles. Sigue las instrucciones en la consola para interactuar con la aplicación.

## Explicación del código

El código se divide en varias partes:

1. Importación de módulos:
   - Se importan los módulos `chalk` y `readline` para dar formato al texto y leer la entrada del usuario desde la consola.

2. Creación de la interfaz readline:
   - Se crea una interfaz readline que utiliza `process.stdin` como entrada y `process.stdout` como salida.

3. Declaración del arreglo de tareas:
   - Se declara un arreglo llamado `tasks` que se utiliza para almacenar las tareas ingresadas por el usuario.

4. Funciones para gestionar las tareas:
   - Se definen las funciones `addTask`, `deleteTask`, `completeTask` y `showTasks` que implementan las diferentes funcionalidades de la aplicación.

5. Función `showMenu`:
   - La función `showMenu` muestra el menú principal y permite al usuario seleccionar una opción. Utiliza `readlineInterface.question()` para solicitar la entrada del usuario y ejecuta la función correspondiente según la opción seleccionada.

6. Mensaje de bienvenida y ejecución inicial:
   - Se muestra un mensaje de bienvenida y se llama a la función `showMenu` para iniciar la interacción con el usuario.

## Funciones con Promesa

Convertimos nuestras funciones `addTask`, `deleteTask`y `completeTask` en funciones con promesa para evaluar los métodos `async/await` y `.then()` y observar en qué se diferencian ambos métodos manejando la asincronía del código. Por ejemplo, ahora al llamar a la función `addTasks()`, se recibirá una promesa que se resolverá cuando el usuario haya agregado un indicador de tarea y una descripción.
A continuación, un ejemplo de la función `addTask`:

1. ¿Qué sucedio al usar `async` y `await`?

### async / await
- Se "envolvió" la lógica del código en una promesa
- Se declaró la función `addTask()` como `async`
- Se usó la palabra clave `await` dentro de la función `async`
- Se usó `await`antes de llamar `questionAsync`para esperar la respuesta del usuario al momento de digitar el indicador y la descripción de la tarea
- Se creó una función auxiliar `questionAsync()` que envuelve `readlineInterface.question()` en una promesa.
- Después de crear la tarea y agregarla al arreglo `tasks`, se llama a `resolve()` para indicar que la promesa se cumplió

### .then()
- Se encadenan las llamadas a la función `question()`, la cual devuelve una promesa. Primero, se recibe el indicador del usuario, luego se verifica si el indicador es un número y posteriormente, se pregunta por la descripción.
- Al igual, se crea una función auxiliar para envolver `readlineInterface.question` en una promesa

2. Diferencia al usar `asyn/await` y `.then()`

Es evidenciable lo expuesto en los contenidos previos: al usar `async/await`, se vuelve el código más legible, se evita el `callback hell` y el encadenamiento excesivo que se genera al usar `.then()`; además, se facilita su comprensión y posterior mantemiento del código. Usar `,then` hace el código difícil de comprender.


## Contribución

Si encuentras algún error, tienes alguna sugerencia o deseas contribuir de alguna forma, siéntete libre de abrir un problema o enviar una solicitud de extracción.






