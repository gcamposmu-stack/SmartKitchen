// planificador.js - Funcionalidad 6: Planificador semanal interactivo

const recetasDisponibles = [
  { nombre: "Pasta Carbonara",  costo: 3500 },
  { nombre: "Tacos de Pollo",   costo: 4000 },
  { nombre: "Ensalada Cesar",   costo: 2800 },
  { nombre: "Sopa de Tomate",   costo: 2200 },
  { nombre: "Arroz con Pollo",  costo: 5500 },
  { nombre: "Tiramisu",         costo: 6000 },
  { nombre: "Avena con Frutas", costo: 1500 },
  { nombre: "Huevos Revueltos", costo: 1200 },
  { nombre: "Smoothie Verde",   costo: 1800 },
  { nombre: "Pancakes",         costo: 2000 },
];

// Estado del planificador: { "Desayuno-Lun": { nombre, costo }, ... }
const planificador = {};

function calcularTotal() {
  return Object.values(planificador).reduce((sum, r) => sum + r.costo, 0);
}

function actualizarPresupuesto() {
  const total = calcularTotal();
  const inputTotal = document.getElementById("total-calculado");
  if (inputTotal) inputTotal.value = `₡${total.toLocaleString()}`;

  const presupuesto = parseInt(document.getElementById("presupuesto")?.value) || 0;
  const alerta = document.querySelector(".alert-success, .alert-warning");
  if (alerta && presupuesto > 0) {
    if (total <= presupuesto) {
      alerta.textContent = `✓ Dentro del presupuesto. Total: ₡${total.toLocaleString()} de ₡${presupuesto.toLocaleString()}`;
      alerta.style.background = "#d4edda";
      alerta.style.color = "#155724";
    } else {
      alerta.textContent = `⚠ Presupuesto superado. Total: ₡${total.toLocaleString()} — Límite: ₡${presupuesto.toLocaleString()}`;
      alerta.style.background = "#f8d7da";
      alerta.style.color = "#721c24";
    }
  }
}

function abrirSelector(celda, clave) {
  // Evitar duplicar el selector
  if (celda.querySelector("select")) return;

  const select = document.createElement("select");
  select.style.cssText = "width:100%;font-size:0.75rem;border:1px solid var(--color-primary);border-radius:4px;padding:2px;";

  const optDefault = document.createElement("option");
  optDefault.value = "";
  optDefault.textContent = "Seleccionar...";
  select.appendChild(optDefault);

  recetasDisponibles.forEach(r => {
    const opt = document.createElement("option");
    opt.value = r.nombre;
    opt.textContent = r.nombre;
    select.appendChild(opt);
  });

  // Valor actual si ya hay una receta
  if (planificador[clave]) {
    select.value = planificador[clave].nombre;
  }

  select.addEventListener("change", () => {
    const seleccionada = recetasDisponibles.find(r => r.nombre === select.value);
    if (seleccionada) {
      planificador[clave] = seleccionada;
      celda.textContent = seleccionada.nombre;
      celda.classList.add("filled");
      actualizarPresupuesto();
      generarListaCompras();
    } else {
      delete planificador[clave];
      celda.textContent = "+ Agregar";
      celda.classList.remove("filled");
      actualizarPresupuesto();
      generarListaCompras();
    }
  });

  celda.textContent = "";
  celda.appendChild(select);
  select.focus();

  // Cerrar si hace clic afuera
  document.addEventListener("click", function cerrar(e) {
    if (!celda.contains(e.target)) {
      if (!planificador[clave]) celda.textContent = "+ Agregar";
      document.removeEventListener("click", cerrar);
    }
  });
}

function generarListaCompras() {
  const tbody = document.querySelector("#lista-compras tbody");
  if (!tbody) return;

  // Ingredientes simulados por receta
  const ingredientesPorReceta = {
    "Pasta Carbonara":  [{ ing: "Pasta", cant: "400g", costo: 1800 }, { ing: "Huevos", cant: "4 unidades", costo: 800 }],
    "Tacos de Pollo":   [{ ing: "Pollo", cant: "300g", costo: 2500 }, { ing: "Tortillas", cant: "8 unidades", costo: 800 }],
    "Ensalada Cesar":   [{ ing: "Lechuga", cant: "1 unidad", costo: 600 }, { ing: "Pollo", cant: "200g", costo: 1800 }],
    "Sopa de Tomate":   [{ ing: "Tomate", cant: "4 unidades", costo: 800 }, { ing: "Caldo", cant: "1 litro", costo: 700 }],
    "Arroz con Pollo":  [{ ing: "Arroz", cant: "1kg", costo: 1500 }, { ing: "Pollo", cant: "500g", costo: 3200 }],
    "Tiramisu":         [{ ing: "Mascarpone", cant: "250g", costo: 3500 }, { ing: "Cafe", cant: "100ml", costo: 500 }],
    "Avena con Frutas": [{ ing: "Avena", cant: "200g", costo: 800 }, { ing: "Frutas", cant: "variadas", costo: 500 }],
    "Huevos Revueltos": [{ ing: "Huevos", cant: "3 unidades", costo: 600 }, { ing: "Mantequilla", cant: "1 cucharada", costo: 200 }],
    "Smoothie Verde":   [{ ing: "Espinaca", cant: "1 taza", costo: 500 }, { ing: "Platano", cant: "1 unidad", costo: 300 }],
    "Pancakes":         [{ ing: "Harina", cant: "2 tazas", costo: 600 }, { ing: "Huevos", cant: "2 unidades", costo: 400 }],
  };

  // Consolidar ingredientes de todas las recetas del planificador
  const consolidado = {};
  Object.values(planificador).forEach(receta => {
    const ings = ingredientesPorReceta[receta.nombre] || [];
    ings.forEach(i => {
      if (consolidado[i.ing]) {
        consolidado[i.ing].costo += i.costo;
      } else {
        consolidado[i.ing] = { cant: i.cant, costo: i.costo };
      }
    });
  });

  if (Object.keys(consolidado).length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:#666;">Agrega recetas al planificador para generar la lista.</td></tr>`;
    return;
  }

  tbody.innerHTML = Object.entries(consolidado).map(([ing, data]) => `
    <tr>
      <td>${ing}</td>
      <td>${data.cant}</td>
      <td>₡${data.costo.toLocaleString()}</td>
    </tr>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  // Hacer las celdas clickeables
  const dias    = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
  const comidas = ["Desayuno", "Almuerzo", "Cena"];

  document.querySelectorAll(".plan-cell").forEach(celda => {
    // Determinar clave única para esta celda basándose en su posición en el grid
    const allCells = Array.from(document.querySelectorAll(".plan-cell"));
    const idx = allCells.indexOf(celda);
    const fila = Math.floor(idx / 7);
    const col  = idx % 7;
    const clave = `${comidas[fila]}-${dias[col]}`;

    celda.style.cursor = "pointer";

    celda.addEventListener("click", () => {
      if (!celda.querySelector("select")) {
        abrirSelector(celda, clave);
      }
    });
  });

  // Agregar id a la tabla de lista de compras
  const tablas = document.querySelectorAll("table");
  tablas.forEach(t => {
    if (t.querySelector("th:first-child")?.textContent === "Ingrediente") {
      t.id = "lista-compras";
    }
  });

  // Agregar id al input de total calculado
  const inputs = document.querySelectorAll("input[readonly]");
  inputs.forEach(i => { if (i.value.includes("₡")) i.id = "total-calculado"; });

  // Evento presupuesto
  document.getElementById("presupuesto")?.addEventListener("input", actualizarPresupuesto);

  // Botón generar lista
  document.querySelectorAll(".btn-primary").forEach(btn => {
    if (btn.textContent.includes("Generar lista")) {
      btn.addEventListener("click", () => {
        generarListaCompras();
        actualizarPresupuesto();
      });
    }
  });

  // Botón guardar semana
  document.querySelectorAll(".btn-secondary").forEach(btn => {
    if (btn.textContent.includes("Guardar semana")) {
      btn.addEventListener("click", () => {
        localStorage.setItem("sk_planificador", JSON.stringify(planificador));
        let msg = document.getElementById("msg-plan");
        if (!msg) {
          msg = document.createElement("div");
          msg.id = "msg-plan";
          msg.style.cssText = "padding:10px 14px;border-radius:6px;margin-top:10px;font-size:0.88rem;background:#d4edda;color:#155724;border-left:4px solid #27ae60;";
          btn.parentElement.appendChild(msg);
        }
        msg.textContent = "✓ Semana guardada correctamente.";
        msg.style.display = "block";
        setTimeout(() => { msg.style.display = "none"; }, 3000);
      });
    }
  });
});
