// crear-receta.js - Funcionalidad 2: Formulario con validación y DOM dinámico

// ── Validaciones ─────────────────────────────────────────────
function mostrarError(id, mensaje) {
  const campo = document.getElementById(id);
  if (!campo) return;
  campo.style.borderColor = "var(--color-error)";
  let err = campo.parentElement.querySelector(".error-msg");
  if (!err) {
    err = document.createElement("span");
    err.className = "error-msg";
    err.style.cssText = "color:var(--color-error);font-size:0.78rem;margin-top:3px;display:block;";
    campo.parentElement.appendChild(err);
  }
  err.textContent = mensaje;
}

function limpiarError(id) {
  const campo = document.getElementById(id);
  if (!campo) return;
  campo.style.borderColor = "";
  const err = campo.parentElement.querySelector(".error-msg");
  if (err) err.remove();
}

function validarFormulario() {
  let valido = true;

  const nombre = document.getElementById("nombre-receta");
  if (!nombre?.value.trim()) {
    mostrarError("nombre-receta", "El nombre de la receta es obligatorio.");
    valido = false;
  } else { limpiarError("nombre-receta"); }

  const descripcion = document.getElementById("descripcion");
  if (!descripcion?.value.trim()) {
    mostrarError("descripcion", "La descripción es obligatoria.");
    valido = false;
  } else { limpiarError("descripcion"); }

  const tipo = document.getElementById("tipo");
  if (!tipo?.value) {
    mostrarError("tipo", "Selecciona el tipo de receta.");
    valido = false;
  } else { limpiarError("tipo"); }

  const dificultad = document.getElementById("dificultad");
  if (!dificultad?.value) {
    mostrarError("dificultad", "Selecciona la dificultad.");
    valido = false;
  } else { limpiarError("dificultad"); }

  const tiempo = document.getElementById("tiempo");
  if (!tiempo?.value || parseInt(tiempo.value) <= 0) {
    mostrarError("tiempo", "El tiempo debe ser mayor a 0 minutos.");
    valido = false;
  } else { limpiarError("tiempo"); }

  const costo = document.getElementById("costo");
  if (!costo?.value || parseInt(costo.value) <= 0) {
    mostrarError("costo", "El costo debe ser mayor a ₡0.");
    valido = false;
  } else { limpiarError("costo"); }

  const paso1 = document.getElementById("paso1");
  if (!paso1?.value.trim()) {
    mostrarError("paso1", "Debe ingresar al menos el Paso 1.");
    valido = false;
  } else { limpiarError("paso1"); }

  return valido;
}

// ── Agregar ingrediente dinámicamente ────────────────────────
function agregarIngrediente() {
  const tbody = document.querySelector("#tabla-ingredientes tbody");
  if (!tbody) return;

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input type="text" placeholder="Ej. Sal"></td>
    <td><input type="text" placeholder="Ej. 1 cucharada"></td>
    <td><input type="number" placeholder="Ej. 100"></td>
    <td><button type="button" class="btn btn-danger btn-sm" onclick="eliminarFila(this)">✕</button></td>
  `;
  tbody.appendChild(tr);
}

function eliminarFila(btn) {
  btn.closest("tr").remove();
}

// ── Agregar paso dinámicamente ────────────────────────────────
let contadorPasos = 3;

function agregarPaso() {
  contadorPasos++;
  const seccionPasos = document.getElementById("seccion-pasos");
  if (!seccionPasos) return;

  const div = document.createElement("div");
  div.className = "form-group";
  div.innerHTML = `
    <label>Paso ${contadorPasos}</label>
    <div style="display:flex;gap:8px;align-items:flex-start;">
      <input type="text" placeholder="Describe el paso ${contadorPasos}..." style="flex:1;">
      <button type="button" class="btn btn-danger btn-sm" style="margin-top:2px;" onclick="eliminarPaso(this)">✕</button>
    </div>
  `;
  seccionPasos.appendChild(div);
}

function eliminarPaso(btn) {
  btn.closest(".form-group").remove();
}

// ── Mensaje de éxito ─────────────────────────────────────────
function mostrarExito(texto) {
  let msg = document.getElementById("msg-crear");
  if (!msg) {
    msg = document.createElement("div");
    msg.id = "msg-crear";
    msg.style.cssText = "padding:12px 16px;border-radius:6px;margin-top:12px;font-size:0.9rem;background:#d4edda;color:#155724;border-left:4px solid #27ae60;";
    document.querySelector(".btn-group")?.after(msg);
  }
  msg.textContent = texto;
  msg.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── Inicializar ───────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Agregar id a la tabla de ingredientes para poder referenciarla
  const tablaIngredientes = document.querySelector("#ingredientes-section table");
  if (tablaIngredientes) tablaIngredientes.id = "tabla-ingredientes";

  // Agregar columna de acciones al thead de ingredientes
  const thead = document.querySelector("#tabla-ingredientes thead tr");
  if (thead && !thead.querySelector("th:last-child")?.textContent.includes("Eliminar")) {
    const th = document.createElement("th");
    th.textContent = "Eliminar";
    thead.appendChild(th);
  }

  // Agregar id a sección de pasos
  const seccionPasos = document.querySelector("section:nth-of-type(3) form");
  if (seccionPasos) seccionPasos.id = "seccion-pasos";

  // Botón agregar ingrediente
  const btnIngrediente = document.querySelector("button[onclick='agregarIngrediente()'], .btn-secondary");
  document.querySelectorAll(".btn-secondary").forEach(btn => {
    if (btn.textContent.includes("Agregar ingrediente")) {
      btn.onclick = agregarIngrediente;
    }
    if (btn.textContent.includes("Agregar paso")) {
      btn.onclick = agregarPaso;
    }
  });

  // Validación en tiempo real al salir de cada campo
  ["nombre-receta", "descripcion", "tipo", "dificultad", "tiempo", "costo", "paso1"].forEach(id => {
    document.getElementById(id)?.addEventListener("blur", () => {
      const val = document.getElementById(id)?.value;
      if (!val || val === "") {
        mostrarError(id, "Este campo es obligatorio.");
      } else {
        limpiarError(id);
      }
    });
  });

  // Submit — publicar receta
  document.querySelector("button[type='submit']")?.addEventListener("click", (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      mostrarExito("✓ Receta publicada correctamente. Quedará disponible tras verificación del chef.");
    }
  });

  // Guardar borrador
  document.querySelectorAll(".btn-secondary").forEach(btn => {
    if (btn.textContent.includes("Guardar Borrador")) {
      btn.addEventListener("click", () => {
        const nombre = document.getElementById("nombre-receta")?.value.trim();
        if (!nombre) {
          mostrarError("nombre-receta", "Ingresa al menos el nombre para guardar el borrador.");
          return;
        }
        mostrarExito(`✓ Borrador "${nombre}" guardado correctamente.`);
      });
    }
  });
});
