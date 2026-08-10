// verificar.js - Funcionalidad 5: Aprobar y rechazar recetas con validación

function mostrarMensaje(texto, tipo) {
  let msg = document.getElementById("msg-verificar");
  if (!msg) {
    msg = document.createElement("div");
    msg.id = "msg-verificar";
    msg.className = `alert alert-${tipo === "success" ? "success" : "info"}`;
    document.querySelector("main .page-title")?.after(msg);
  }
  msg.textContent = texto;
  msg.style.background = tipo === "success" ? "#d4edda" : tipo === "error" ? "#f8d7da" : "#d1ecf1";
  msg.style.color       = tipo === "success" ? "#155724" : tipo === "error" ? "#721c24" : "#0c5460";
  msg.style.borderLeft  = `4px solid ${tipo === "success" ? "#27ae60" : tipo === "error" ? "#c0392b" : "#17a2b8"}`;
  msg.style.display = "block";
  setTimeout(() => { msg.style.display = "none"; }, 4000);
}

function aprobarReceta(btn) {
  const card = btn.closest(".card");
  const nombre = card.querySelector("h3")?.textContent.trim();

  card.style.transition = "opacity 0.3s, transform 0.3s";
  card.style.opacity = "0";
  card.style.transform = "scale(0.95)";

  setTimeout(() => {
    card.remove();
    actualizarContadorPendientes();
    mostrarMensaje(`✓ Receta "${nombre}" aprobada y publicada correctamente.`, "success");
  }, 300);
}

function rechazarReceta(btn) {
  const card = btn.closest(".card");
  const nombre = card.querySelector("h3")?.textContent.trim();
  const motivo = document.getElementById("comentario-rechazo")?.value.trim();

  if (!motivo) {
    mostrarMensaje("⚠ Debes ingresar el motivo de rechazo antes de continuar.", "error");
    document.getElementById("comentario-rechazo")?.focus();
    document.getElementById("comentario-rechazo").style.borderColor = "var(--color-error)";
    return;
  }

  card.style.transition = "opacity 0.3s";
  card.style.opacity = "0";

  setTimeout(() => {
    card.remove();
    actualizarContadorPendientes();
    mostrarMensaje(`✗ Receta "${nombre}" rechazada. Notificación enviada al usuario.`, "error");
    document.getElementById("comentario-rechazo").value = "";
    document.getElementById("comentario-rechazo").style.borderColor = "";
  }, 300);
}

function actualizarContadorPendientes() {
  const pendientes = document.querySelectorAll(".cards-grid .card").length;
  const alerta = document.querySelector(".alert-info");
  if (alerta) {
    alerta.textContent = pendientes > 0
      ? `Hay ${pendientes} receta(s) pendientes de verificación.`
      : "No hay recetas pendientes de verificación.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Asignar eventos a botones Aprobar/Rechazar de las cards
  document.querySelectorAll(".card .btn-primary").forEach(btn => {
    if (btn.textContent.trim() === "Aprobar") {
      btn.addEventListener("click", () => aprobarReceta(btn));
    }
  });

  document.querySelectorAll(".card .btn-danger").forEach(btn => {
    if (btn.textContent.trim() === "Rechazar") {
      btn.addEventListener("click", () => rechazarReceta(btn));
    }
  });

  // Botones de la sección vista previa
  document.querySelectorAll(".btn-group .btn-primary").forEach(btn => {
    if (btn.textContent.includes("Aprobar Receta")) {
      btn.addEventListener("click", () => {
        mostrarMensaje("✓ Receta aprobada y publicada correctamente.", "success");
      });
    }
  });

  document.querySelectorAll(".btn-group .btn-danger").forEach(btn => {
    if (btn.textContent.includes("Rechazar")) {
      btn.addEventListener("click", () => {
        const motivo = document.getElementById("comentario-rechazo")?.value.trim();
        if (!motivo) {
          mostrarMensaje("⚠ Debes ingresar el motivo de rechazo.", "error");
          document.getElementById("comentario-rechazo")?.focus();
          document.getElementById("comentario-rechazo").style.borderColor = "var(--color-error)";
          return;
        }
        mostrarMensaje("✗ Receta rechazada. Notificación enviada al usuario.", "error");
        document.getElementById("comentario-rechazo").value = "";
        document.getElementById("comentario-rechazo").style.borderColor = "";
      });
    }
  });

  // Limpiar error del textarea al escribir
  document.getElementById("comentario-rechazo")?.addEventListener("input", () => {
    document.getElementById("comentario-rechazo").style.borderColor = "";
  });
});
