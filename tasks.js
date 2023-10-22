const readline = require("readline")
const http = require("http");
const port = 3000;
const host = "localhost";

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const tasks = []; 

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/tasks") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Recurso no encontrado');
    }
});
server.listen(port, host, () => {
    console.log("")
})

const questionAsync = (question) => {
    return new Promise((resolve) => {
        readlineInterface.question(question, resolve);
    });
};
const addTask = () => {
    return new Promise(async(resolve) => {
        const indicator = await questionAsync("Por favor, digite un indicador único para la tarea: "); // await antes de qestionAsyn para esperar la respuesta del usuario
        if (isNaN(indicator)) {
            (console.log("EL INDICADOR DEBE SER UN NÚMERO❗👉VUELVE A INTENTAR"))
            showMenu();
            return;
        }
        const repeatedTask = tasks.find(task => task.indicator === indicator);
        if (repeatedTask) {
            (console.log("YA EXISTE UNA TAREA CON EL MISMO INDICADOR❌👉SELECCIONA OTRO NÚMERO"));
                showMenu();
                return;
        }
        const description = await questionAsync("Digite una descripción para la tarea que desee agregar: ");
        const task = {
            indicator,
            description,
            completed: false
        };
        tasks.push(task);
        console.log("TAREA AGREGADA CORRECTAMENTE✅");
        resolve();
        showMenu();
    });
};

const deleteTask = () => {
    return new Promise(async(resolve) => {
        const indicator = await questionAsync("Digite un indicador para la tarea que desee eliminar: ");
        const taskIndex = tasks.findIndex(task => task.indicator === indicator);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            console.log("TAREA ELIMINADA CORRECTAMENTE✅");
        } else {
            console.log("¡NINGUNA TAREA COINCIDE CON EL INDICADOR PROPORCIONADO❗");
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
            console.log("TAREA MARCADA COMO COMPLETADA CORRECTAMENTE✅");
        } else {
            console.log("¡NINGUNA TAREA COINCIDE CON EL INDICADOR PROPORCIONADO❗");
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
    console.log('\n--- MENU ---');
    console.log('1. Agregar tarea');
    console.log('2. Eliminar tarea');
    console.log('3. Marcar tarea como completada');
    console.log('4. Mostrar lista de tareas');
    console.log('5. Salir');

    readlineInterface.question('\nSeleccione una opción: ', (option) => {
        switch (option) {
            case "1":
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
                readlineInterface.close();
                break;
            default:
                console.log("INVÁLIDO. DEBE INGRESAR ESCOGER UNA DE LAS OPCIONES DEL MENÚ: 1, 2, 3, 4, 5");
                showMenu();
                break;
        }
    });
};

console.log("BIENVENIDO A LA APP PARA ADMINISTRAR TUS TAREAS");

showMenu();


