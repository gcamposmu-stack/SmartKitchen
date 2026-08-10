// buscar.js - Funcionalidad 1: Búsqueda y filtros de recetas

// Datos simulados de recetas
const recetas = [
  { nombre: "Pasta Carbonara",    tiempo: 20, costo: 3500, categoria: "cena",     dificultad: "medio",  estrellas: 4 },
  { nombre: "Tacos de Pollo",     tiempo: 30, costo: 4000, categoria: "almuerzo", dificultad: "facil",  estrellas: 5 },
  { nombre: "Ensalada Cesar",     tiempo: 15, costo: 2800, categoria: "almuerzo", dificultad: "facil",  estrellas: 4 },
  { nombre: "Sopa de Tomate",     tiempo: 25, costo: 2200, categoria: "cena",     dificultad: "facil",  estrellas: 3 },
  { nombre: "Arroz con Pollo",    tiempo: 45, costo: 5500, categoria: "almuerzo", dificultad: "medio",  estrellas: 5 },
  { nombre: "Tiramisu",           tiempo: 60, costo: 6000, categoria: "postre",   dificultad: "dificil",estrellas: 4 },
  { nombre: "Avena con Frutas",   tiempo: 10, costo: 1500, categoria: "desayuno", dificultad: "facil",  estrellas: 4 },
  { nombre: "Huevos Revueltos",   tiempo: 10, costo: 1200, categoria: "desayuno", dificultad: "facil",  estrellas: 3 },
  { nombre: "Ceviche Tropical",   tiempo: 20, costo: 4500, categoria: "almuerzo", dificultad: "medio",  estrellas: 5 },
  { nombre: "Smoothie Verde",     tiempo: 5,  costo: 1800, categoria: "desayuno", dificultad: "facil",  estrellas: 4 },
];

function estrellas(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function renderTabla(lista) {
  const tbody = document.querySelector("tbody");
  if (!tbody) return;

  if (lista.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#666;padding:20px;">No se encontraron recetas con esos filtros.</td></tr>`;
    return;
  }

  tbody.innerHTML = lista.map(r => `
    <tr>
      <td>${r.nombre}</td>
      <td>${r.tiempo} min</td>
      <td>₡${r.costo.toLocaleString()}</td>
      <td class="stars">${estrellas(r.estrellas)}</td>
      <td>
        <a href="detalle-receta.html" class="btn btn-primary btn-sm">Ver detalle</a>
        <button class="btn btn-secondary btn-sm" onclick="guardarFavorito('${r.nombre}')">Guardar</button>
      </td>
    </tr>
  `).join("");
}

function filtrar() {
  const texto      = document.getElementById("input-buscar")?.value.toLowerCase().trim() || "";
  const categoria  = document.getElementById("filtro-categoria")?.value || "";
  const dificultad = document.getElementById("filtro-dificultad")?.value || "";
  const presupuesto= parseInt(document.getElementById("filtro-presupuesto")?.value) || 0;

  const resultado = recetas.filter(r => {
    const coincideTexto      = texto === "" || r.nombre.toLowerCase().includes(texto);
    const coincideCategoria  = categoria === "" || r.categoria === categoria;
    const coincideDificultad = dificultad === "" || r.dificultad === dificultad;
    const coincidePresupuesto= presupuesto === 0 || r.costo <= presupuesto;
    return coincideTexto && coincideCategoria && coincideDificultad && coincidePresupuesto;
  });

  renderTabla(resultado);
  actualizarContador(resultado.length);
}

function actualizarContador(total) {
  let contador = document.getElementById("contador-resultados");
  if (!contador) {
    contador = document.createElement("p");
    contador.id = "contador-resultados";
    contador.style.cssText = "font-size:0.85rem;color:#666;margin-bottom:8px;";
    document.querySelector(".table-wrapper")?.before(contador);
  }
  contador.textContent = `${total} receta(s) encontrada(s)`;
}

function guardarFavorito(nombre) {
  const favoritos = JSON.parse(localStorage.getItem("sk_favoritos") || "[]");
  if (!favoritos.includes(nombre)) {
    favoritos.push(nombre);
    localStorage.setItem("sk_favoritos", JSON.stringify(favoritos));
    mostrarMensaje(`"${nombre}" guardada en favoritos ✓`, "success");
  } else {
    mostrarMensaje(`"${nombre}" ya está en tus favoritos`, "info");
  }
}

function mostrarMensaje(texto, tipo) {
  let msg = document.getElementById("msg-buscar");
  if (!msg) {
    msg = document.createElement("div");
    msg.id = "msg-buscar";
    msg.style.cssText = "padding:10px 14px;border-radius:6px;margin-bottom:12px;font-size:0.88rem;";
    document.querySelector("section:last-of-type h2")?.after(msg);
  }
  msg.textContent = texto;
  msg.style.background = tipo === "success" ? "#d4edda" : "#d1ecf1";
  msg.style.color       = tipo === "success" ? "#155724" : "#0c5460";
  msg.style.display = "block";
  setTimeout(() => { msg.style.display = "none"; }, 3000);
}

// ── Inicializar al cargar la página ──────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Agregar id al input de búsqueda
  const inputBuscar = document.querySelector(".search-bar input");
  if (inputBuscar) inputBuscar.id = "input-buscar";

  // Render inicial con todas las recetas
  renderTabla(recetas);
  actualizarContador(recetas.length);

  // Evento: búsqueda en tiempo real mientras escribe
  inputBuscar?.addEventListener("input", filtrar);

  // Evento: botón Buscar
  document.querySelector(".search-bar .btn")?.addEventListener("click", filtrar);

  // Evento: filtros con change
  document.getElementById("filtro-categoria")?.addEventListener("change", filtrar);
  document.getElementById("filtro-dificultad")?.addEventListener("change", filtrar);
  document.getElementById("filtro-presupuesto")?.addEventListener("change", filtrar);

  // Evento: botón Aplicar filtros
  document.querySelector(".filtros .btn-primary")?.addEventListener("click", filtrar);
});
