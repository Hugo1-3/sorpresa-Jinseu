let contador = 0;
const declaracion = document.getElementById("declaracion");
const ticket = document.getElementById("ticket");
const mensaje = document.getElementById("mensaje");
const boton = document.getElementById("boton");

// FUNCION CUANDO DICE "SI"
let formularioEnviado = false; 

function si() {
  document.getElementById('declaracion').style.display = 'none';
  document.getElementById('ticket').style.display = 'block';

  document.getElementById('respuestaInput').value = "¡Dijo que SÍ a la cita! ❤️";
}

function enviarFormulario(esCierreDePestaña = false) {
  if (formularioEnviado) return; 

  const sugerenciaTexto = document.getElementById('sugerenciaUsuario').value;
  document.getElementById('sugerenciaInput').value = sugerenciaTexto || "(No dejó sugerencias)";
  
  const urlFormspree = "https://formspree.io/f/xqeobggq";
  const form = document.getElementById('miForm');

  if (esCierreDePestaña) {
  
    const formData = new FormData(form);
    navigator.sendBeacon(urlFormspree, formData);
  } else {
    form.submit();
  }

  formularioEnviado = true; 
}

function enviarRespuesta() {
  enviarFormulario(false); 

  setTimeout(() => {
    window.close(); 
  }, 1000);
}

window.addEventListener("beforeunload", (event) => {
  const ticket = document.getElementById('ticket');
  if (ticket && ticket.style.display === 'block' && !formularioEnviado) {
    enviarFormulario(true); 
  }
});

// FUNCION CUANDO DICE "NO"
function no() {
  contador++;
  const respuestas = [
    "amiga para llantear pues",
    "yape dime que si",
    "piensalo bien no te vas ha arrepentir",
    "COMO NO VAS A QUERER SALIR CONMIGO SI SOY EL MEJOR",
    "amiga no te votes pe",
    "Jinseu asi, eso no vale haaa 😭"
  ];

  mensaje.textContent = respuestas[contador % respuestas.length];

}

// BOTON QUE SE MUEVE
document.addEventListener("mousemove", (e) => {
  const rect = boton.getBoundingClientRect();
  const distancia = 100; // Distancia de activación en px

  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);

  const distanciaCursor = Math.sqrt(dx * dx + dy * dy);

  if (distanciaCursor < distancia) {
    const nuevaX = Math.random() * (window.innerWidth - rect.width);
    const nuevaY = Math.random() * (window.innerHeight - rect.height);
    boton.style.left = `${nuevaX}px`;
    boton.style.top = `${nuevaY}px`;
  }
});

boton.addEventListener("click", no);

