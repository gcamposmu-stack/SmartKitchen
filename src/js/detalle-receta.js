// detalle-receta.js - Funcionalidad extra: comentarios y guardar en favoritos

function mostrarMensaje(texto, tipo) {
  let msg = document.getElementById("msg-detalle");
  if (!msg) {
    msg = document.createElement("div");
    msg.id = "msg-detalle";
    msg.style.cssText = "padding:10px 14px;border-radius:6px;margin:10px 0;font-size:0.88rem;";
    document.querySelector("section:last-of-type")?.prepend(msg);
  }
  msg.textContent = texto;
  msg.style.background = tipo === "success" ? "#d4edda" : "#f8d7da";
  msg.style.color       = tipo === "success" ? "#155724" : "#721c24";
  msg.style.borderLeft  = `4px solid ${tipo === "success" ? "#27ae60" : "#c0392b"}`;
  msg.style.display = "block";
  setTimeout(() => { msg.style.display = "none"; }, 3000);
}

function publicarComentario() {
  const textarea = document.getElementById("nuevo-comentario");
  const texto = textarea?.value.trim();

  if (!texto) {
    mostrarMensaje("Escribe un comentario antes de publicar.", "error");
    textarea.style.borderColor = "var(--color-error)";
    return;
  }

  textarea.style.borderColor = "";

  // Crear nuevo comentario en el DOM
  const contenedor = document.querySelector("section:last-of-type > div");
  const articulo = document.createElement("article");
  articulo.style.cssText = "background:var(--color-white);border:1px solid var(--color-border);border-radius:var(--radius);padding:12px;";
  articulo.innerHTML = `
    <p><strong>Tú:</strong> ${texto}</p>
    <p class="stars" style="font-size:0.8rem;">★★★★★</p>
  `;

  contenedor?.appendChild(articulo);
  textarea.value = "";
  mostrarMensaje("✓ Comentario publicado correctamente.", "success");
}

document.addEventListener("DOMContentLoaded", () => {
  // Botón publicar comentario
  document.querySelectorAll(".btn-primary").forEach(btn => {
    if (btn.textContent.includes("Publicar comentario")) {
      btn.addEventListener("click", publicarComentario);
    }
  });

  // Limpiar error al escribir
  document.getElementById("nuevo-comentario")?.addEventListener("input", () => {
    document.getElementById("nuevo-comentario").style.borderColor = "";
  });

  // Guardar en favoritos
  document.querySelectorAll(".btn-primary").forEach(btn => {
    if (btn.textContent.includes("Guardar en Favoritos")) {
      btn.addEventListener("click", () => {
        const nombre = document.querySelector(".page-title h1")?.textContent;
        const favoritos = JSON.parse(localStorage.getItem("sk_favoritos") || "[]");
        if (!favoritos.includes(nombre)) {
          favoritos.push(nombre);
          localStorage.setItem("sk_favoritos", JSON.stringify(favoritos));
          mostrarMensaje(`✓ "${nombre}" guardada en favoritos.`, "success");
        } else {
          mostrarMensaje(`"${nombre}" ya está en tus favoritos.`, "error");
        }
      });
    }
  });
});
