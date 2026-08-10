// login.js - Funcionalidad 7: Login simulado con roles (usuario/chef)

// Usuarios simulados
const usuarios = [
  { correo: "usuario@smartkitchen.com", password: "usuario123", rol: "usuario", nombre: "Usuario" },
  { correo: "chef@smartkitchen.com",    password: "chef123",    rol: "chef",    nombre: "Chef Juan" },
  { correo: "admin@smartkitchen.com",   password: "admin123",   rol: "admin",   nombre: "Admin" },
];

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

function validarCorreo(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function validarPassword(password) {
  return password.length >= 6;
}

function intentarLogin(e) {
  e.preventDefault();
  let valido = true;

  const correo   = document.getElementById("correo-login")?.value.trim();
  const password = document.getElementById("password-login")?.value;

  // Validar correo
  if (!correo) {
    mostrarError("correo-login", "El correo es obligatorio.");
    valido = false;
  } else if (!validarCorreo(correo)) {
    mostrarError("correo-login", "Ingresa un correo válido (ej: usuario@correo.com).");
    valido = false;
  } else {
    limpiarError("correo-login");
  }

  // Validar contraseña
  if (!password) {
    mostrarError("password-login", "La contraseña es obligatoria.");
    valido = false;
  } else if (!validarPassword(password)) {
    mostrarError("password-login", "La contraseña debe tener al menos 6 caracteres.");
    valido = false;
  } else {
    limpiarError("password-login");
  }

  if (!valido) return;

  // Verificar credenciales
  const usuario = usuarios.find(u => u.correo === correo && u.password === password);

  if (!usuario) {
    mostrarMensajeGlobal("Correo o contraseña incorrectos. Intenta de nuevo.", "error");
    return;
  }

  // Guardar sesión simulada
  sessionStorage.setItem("sk_usuario", JSON.stringify(usuario));

  mostrarMensajeGlobal(`✓ Bienvenido, ${usuario.nombre}. Redirigiendo...`, "success");

  // Redirigir según rol
  setTimeout(() => {
    if (usuario.rol === "chef" || usuario.rol === "admin") {
      window.location.href = "mis-recetas.html";
    } else {
      window.location.href = "index.html";
    }
  }, 1500);
}

function mostrarMensajeGlobal(texto, tipo) {
  let msg = document.getElementById("msg-login");
  if (!msg) {
    msg = document.createElement("div");
    msg.id = "msg-login";
    msg.style.cssText = "padding:12px 16px;border-radius:6px;margin-top:12px;font-size:0.9rem;";
    document.querySelector("form")?.appendChild(msg);
  }
  msg.textContent = texto;
  msg.style.background = tipo === "success" ? "#d4edda" : "#f8d7da";
  msg.style.color       = tipo === "success" ? "#155724" : "#721c24";
  msg.style.borderLeft  = `4px solid ${tipo === "success" ? "#27ae60" : "#c0392b"}`;
  msg.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");
  form?.addEventListener("submit", intentarLogin);

  // Limpiar errores al escribir
  document.getElementById("correo-login")?.addEventListener("input", () => limpiarError("correo-login"));
  document.getElementById("password-login")?.addEventListener("input", () => limpiarError("password-login"));

  // Mostrar credenciales de ayuda
  const hint = document.createElement("div");
  hint.style.cssText = "margin-top:16px;padding:10px 14px;background:#d1ecf1;color:#0c5460;border-radius:6px;font-size:0.8rem;border-left:4px solid #17a2b8;";
  hint.innerHTML = `
    <strong>Credenciales de prueba:</strong><br>
    👤 Usuario: usuario@smartkitchen.com / usuario123<br>
    👨‍🍳 Chef: chef@smartkitchen.com / chef123<br>
    🔧 Admin: admin@smartkitchen.com / admin123
  `;
  document.querySelector("form")?.appendChild(hint);
});
