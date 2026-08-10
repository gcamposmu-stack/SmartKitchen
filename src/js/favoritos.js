// favoritos.js - Funcionalidad 4: Gestión de favoritos y notas personales

function mostrarMensaje(texto, tipo) {
  let msg = document.getElementById("msg-favoritos");
  if (!msg) {
    msg = document.createElement("div");
    msg.id = "msg-favoritos";
    msg.style.cssText = "padding:10px 14px;border-radius:6px;margin:10px 0;font-size:0.88rem;";
    document.querySelector(".table-wrapper")?.before(msg);
  }
  msg.textContent = texto;
  msg.style.background = tipo === "success" ? "#d4edda" : "#f8d7da";
  msg.style.color       = tipo === "success" ? "#155724" : "#721c24";
  msg.style.borderLeft  = `4px solid ${tipo === "success" ? "#27ae60" : "#c0392b"}`;
  msg.style.display = "block";
  setTimeout(() => { msg.style.display = "none"; }, 3000);
}

function eliminarFavorito(btn) {
  const fila = btn.closest("tr");
  const nombre = fila.querySelector("td:first-child")?.textContent.trim();

  if (!confirm(`¿Eliminar "${nombre}" de tus favoritos?`)) return;

  fila.style.transition = "opacity 0.3s";
  fila.style.opacity = "0";
  setTimeout(() => {
    fila.remove();
    actualizarContador();
    mostrarMensaje(`"${nombre}" eliminada de favoritos.`, "success");
  }, 300);
}

function actualizarContador() {
  const filas = document.querySelectorAll("tbody tr");
  let contador = document.getElementById("contador-favoritos");
  if (!contador) {
    contador = document.createElement("p");
    contador.id = "contador-favoritos";
    contador.style.cssText = "font-size:0.85rem;color:#666;margin-bottom:8px;";
    document.querySelector(".table-wrapper")?.before(contador);
  }
  contador.textContent = `${filas.length} receta(s) guardada(s)`;
}

function guardarNota() {
  const textarea = document.getElementById("notas");
  const nota = textarea?.value.trim();

  if (!nota) {
    mostrarMensaje("Escribe una nota antes de guardar.", "error");
    return;
  }

  // Guardar en localStorage
  const notas = JSON.parse(localStorage.getItem("sk_notas") || "{}");
  notas["general"] = nota;
  localStorage.setItem("sk_notas", JSON.stringify(notas));

  mostrarMensaje("✓ Nota guardada correctamente.", "success");
}

function crearColeccion() {
  const nombre = prompt("Nombre de la nueva colección:");
  if (!nombre?.trim()) return;

  const grid = document.querySelector(".cards-grid");
  if (!grid) return;

  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <div class="card-img-placeholder">Colección</div>
    <div class="card-body">
      <h3>${nombre.trim()}</h3>
      <p>0 recetas guardadas</p>
      <div class="card-actions">
        <a href="buscar.html" class="btn btn-primary btn-sm">Ver colección</a>
        <button class="btn btn-danger btn-sm" onclick="this.closest('.card').remove()">Eliminar</button>
      </div>
    </div>
  `;

  grid.appendChild(card);
  mostrarMensaje(`✓ Colección "${nombre.trim()}" creada.`, "success");
}

document.addEventListener("DOMContentLoaded", () => {
  // Asignar evento eliminar a cada botón de la tabla
  document.querySelectorAll("tbody .btn-danger").forEach(btn => {
    if (btn.textContent.trim() === "Eliminar") {
      btn.addEventListener("click", () => eliminarFavorito(btn));
    }
  });

  // Botón guardar nota
  document.querySelector("#notas + button, .btn-secondary")?.addEventListener("click", guardarNota);
  document.querySelectorAll(".btn-secondary").forEach(btn => {
    if (btn.textContent.trim() === "Guardar nota") {
      btn.addEventListener("click", guardarNota);
    }
  });

  // Botón nueva colección
  document.querySelectorAll(".btn-primary").forEach(btn => {
    if (btn.textContent.includes("Nueva Coleccion") || btn.textContent.includes("Nueva Colección")) {
      btn.addEventListener("click", crearColeccion);
    }
  });

  // Recuperar notas guardadas
  const notas = JSON.parse(localStorage.getItem("sk_notas") || "{}");
  if (notas["general"]) {
    const textarea = document.getElementById("notas");
    if (textarea) textarea.value = notas["general"];
  }

  actualizarContador();
});
