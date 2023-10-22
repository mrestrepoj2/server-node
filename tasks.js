import chalk from "chalk";
import readline from 'readline';
// //creación de la interfaz readline utilizando el método createInterface()
// Se configurala entrada estándar (process.stdin) como entrada y la salida estándar (process.stdout) como salida de la interfaz.
const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const tasks = []; //para almacenar las tareas ingresadas por el usuario

const addTask = () => {
    return new Promise(async(resolve) => {
        const indicator = await questionAsync(chalk.green("Por favor, digite un indicador único para la tarea: ")); // await antes de qestionAsyn para esperar la respuesta del usuario
        if (isNaN(indicator)) {
            (console.log(chalk.red("EL INDICADOR DEBE SER UN NÚMERO❗👉VUELVE A INTENTAR")))
            showMenu();
            return;
        }
        const repeatedTask = tasks.find(task => task.indicator === indicator);
        if (repeatedTask) {
            (console.log(chalk.red("YA EXISTE UNA TAREA CON EL MISMO INDICADOR❌👉SELECCIONA OTRO NÚMERO")));
                showMenu();
                return;
        }
        const description = await questionAsync(chalk.green("Digite una descripción para la tarea que desee agregar: "));
            // Luego de obtener las respuestas del usuario, se crea la tarea y se agrega al array de tareas y se muestra un mensaje de confirmación            
        const task = {
            indicator,
            description,
            completed: false
        };
            //se llama a resolve para indicar que la promesa se cumplió
        tasks.push(task);
        console.log(chalk.magenta("TAREA AGREGADA CORRECTAMENTE✅"));
        resolve();
        showMenu();
    });
};

// función auxiliar que envuelve readlineInterface.question() en una promesa
const questionAsync = (question) => {
    return new Promise((resolve) => {
        readlineInterface.question(question, resolve);
    });
};

const deleteTask = () => {
    return new Promise(async(resolve) => {
        const indicator = await questionAsync("Digite un indicador para la tarea que desee eliminar: ");
        const taskIndex = tasks.findIndex(task => task.indicator === indicator);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            console.log(chalk.bold.magenta
                    ("TAREA ELIMINADA CORRECTAMENTE✅"));
        } else {
            console.log(chalk.red
                ("¡NINGUNA TAREA COINCIDE CON EL INDICADOR PROPORCIONADO❗"));
        }
        resolve();
        showMenu();
    });
};

const completeTask = () => {
    return new Promise(async(resolve) => {
        const indicator = await questionAsync("Digite el indicador de la tarea a marcar como completada: ")
        const task = tasks.find(task => task.indicator === indicator);
        if (task) {
            task.completed = true;
            console.log(chalk.magenta("TAREA MARCADA COMO COMPLETADA CORRECTAMENTE✅"));
        } else {
            console.log(chalk.red("¡NINGUNA TAREA COINCIDE CON EL INDICADOR PROPORCIONADO❗"));
        }
        resolve();
        showMenu();
    });
};

const showTasks = () => {
    console.log("Task List: ");
    tasks.forEach((task, index) => {
        console.log(`[${index}] Indicador: ${task.indicator} | Descripción: ${task.description} | Completada: ${task.completed ? "Sí" : "No"}`);
    });
    showMenu();
};

const showMenu = () => {
    console.log(chalk.bold.yellow('\n--- MENU ---'));
    console.log('1. Agregar tarea');
    console.log('2. Eliminar tarea');
    console.log('3. Marcar tarea como completada');
    console.log('4. Mostrar lista de tareas');
    console.log('5. Salir');

    readlineInterface.question('\nSeleccione una opción: ', (option) => {
        switch (option) {
            case '1':
                addTask();
                break;
            case '2':
                deleteTask();
                break;
            case '3':
                completeTask();
                break;
            case '4':
                showTasks();
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log(chalk.red("INVÁLIDO. DEBE INGRESAR ESCOGER UNA DE LAS OPCIONES DEL MENÚ: 1, 2, 3, 4, 5"));
                showMenu();
                break;
        }
    });
};

console.log(chalk.bold.blue("BIENVENIDO A LA APP PARA ADMINISTRAR TUS TAREAS"));

showMenu();


