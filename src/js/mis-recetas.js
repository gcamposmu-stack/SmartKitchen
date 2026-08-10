// mis-recetas.js - Funcionalidad 3: CRUD simulado de recetas del chef

function mostrarMensaje(texto, tipo) {
  let msg = document.getElementById("msg-recetas");
  if (!msg) {
    msg = document.createElement("div");
    msg.id = "msg-recetas";
    msg.style.cssText = "padding:10px 14px;border-radius:6px;margin-bottom:12px;font-size:0.88rem;";
    document.querySelector("section h2")?.after(msg);
  }
  msg.textContent = texto;
  msg.style.background = tipo === "success" ? "#d4edda" : tipo === "error" ? "#f8d7da" : "#d1ecf1";
  msg.style.color       = tipo === "success" ? "#155724" : tipo === "error" ? "#721c24" : "#0c5460";
  msg.style.borderLeft  = `4px solid ${tipo === "success" ? "#27ae60" : tipo === "error" ? "#c0392b" : "#17a2b8"}`;
  msg.style.display = "block";
  setTimeout(() => { msg.style.display = "none"; }, 3500);
}

function eliminarReceta(btn) {
  const fila = btn.closest("tr");
  const nombre = fila.querySelector("td:first-child")?.textContent.trim();

  if (!confirm(`¿Estás seguro de que deseas eliminar "${nombre}"?`)) return;

  fila.style.transition = "opacity 0.3s";
  fila.style.opacity = "0";
  setTimeout(() => {
    fila.remove();
    actualizarContador();
    mostrarMensaje(`"${nombre}" eliminada correctamente.`, "success");
  }, 300);
}

function actualizarContador() {
  const filas = document.querySelectorAll("tbody tr");
  let contador = document.getElementById("contador-recetas");
  if (!contador) {
    contador = document.createElement("p");
    contador.id = "contador-recetas";
    contador.style.cssText = "font-size:0.85rem;color:#666;margin-bottom:8px;";
    document.querySelector(".table-wrapper")?.before(contador);
  }
  contador.textContent = `${filas.length} receta(s) en total`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Asignar evento a todos los botones Eliminar
  document.querySelectorAll(".btn-danger.btn-sm").forEach(btn => {
    if (btn.textContent.trim() === "Eliminar") {
      btn.addEventListener("click", () => eliminarReceta(btn));
    }
  });

  actualizarContador();
});
