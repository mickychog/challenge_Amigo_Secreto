// Array para guardar los nombres de los amigos
const amigos = [];

// Función para mostrar notificaciones atractivas
function mostrarNotificacion(mensaje) {
  const notificacion = document.createElement("div");
  notificacion.textContent = mensaje;
  notificacion.style.cssText = `
    position: fixed;
    top: 20px;
    right: center;
    background-color: var(--color-button);
    color: var(--color-white);
    padding: 15px 25px;
    border: 3px solid var(--color-black);
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.3);
    z-index: 1000;
  `;

  document.body.appendChild(notificacion);
  setTimeout(() => notificacion.remove(), 3000);
}

// Función para agregar nombres a la lista
function agregarAmigo() {
  const input = document.getElementById("amigo");
  const nombre = input.value.trim();

  // Expresión regular para validar que solo contenga letras y espacios
  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  if (nombre === "") {
    mostrarNotificacion("Por favor, ingresa un nombre válido.");
    return;
  }

  if (!regexNombre.test(nombre)) {
    mostrarNotificacion("El nombre solo puede contener letras y espacios. Por favor, intenta de nuevo.");
    return;
  }

  amigos.push(nombre);
  actualizarLista();
  input.value = ""; // Limpia el campo de entrada
  mostrarNotificacion(`"${nombre}" ha sido añadido a la lista.`);
}

// Función para actualizar la lista visible
function actualizarLista() {
  const lista = document.getElementById("listaAmigos");
  lista.innerHTML = ""; // Limpia la lista antes de actualizar

  amigos.forEach((amigo, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${amigo}`;
    lista.appendChild(li);
  });
}

// Función para realizar el sorteo de un amigo secreto
function sortearAmigo() {
  if (amigos.length === 0) {
    mostrarNotificacion("La lista está vacía. Agrega nombres antes de sortear.");
    return;
  }

  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const amigoSecreto = amigos[indiceAleatorio];

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `<li>¡El amigo secreto es: <strong>${amigoSecreto}</strong>!</li>`;
  mostrarNotificacion(`¡Sorteo completado! El amigo secreto es: ${amigoSecreto}`);
}

// Función para reiniciar la aplicación
function reiniciarApp() {
  amigos.length = 0; // Vacía el array
  actualizarLista(); // Actualiza la lista en pantalla
  document.getElementById("resultado").innerHTML = ""; // Limpia el resultado
  mostrarNotificacion("La aplicación ha sido reiniciada.");
}