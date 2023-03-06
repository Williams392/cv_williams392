/*==================== SHOW MENU ====================*/

const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  // Validar que existan variables
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      // Agregamos la clase show-menu a la etiqueta div con la clase nav__menu
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu"); // -> el (html) el id:

/*==================== REMOVE MENU MOBILE ====================*/

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // Cuando hacemos clic en cada nav__link, eliminamos la clase show-menu
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL DESPLAZAR SECCIONES ENLACE ACTIVO ====================*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link"); // -> css
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  // Cuando el desplazamiento es superior a la altura de la ventana gráfica 560, agregue la clase show-scroll a la etiqueta a con la clase scroll-top
  if (this.scrollY >= 200) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

/*==================== DARK LIGHT THEME ====================*/

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Tema previamente seleccionado (si el usuario lo seleccionó)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Obtenemos el tema actual que tiene la interfaz validando la clase dark-theme
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// Validamos si el usuario eligió previamente un tema
if (selectedTheme) {
  // Si se cumple la validación, preguntamos cuál fue el problema para saber si activamos o desactivamos la oscuridad.
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activar/desactivar el tema manualmente con el botón
themeButton.addEventListener("click", () => {
  // Agregar o eliminar el tema oscuro/icono
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // Guardamos el tema y el icono actual que eligió el usuario
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== REDUCE EL TAMAÑO E IMPRIME EN UNA HOJA A4 ====================*/

function scaleCv() {
  document.body.classList.add("scale-cv");
}

/*==================== QUITAR EL TAMAÑO CUANDO SE DESCARGUE EL CV====================*/

function removeScale() {
  document.body.classList.remove("scale-cv");
}

/*==================== GENERATE PDF ====================*/
// Área generada en PDF
let areaCv = document.getElementById("area-cv");

let resumeButton = document.getElementById("resume-button");

// Html2pdf options
let opt = {
  margin: 0,
  filename: "pdf_valle.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 4 },
  jsPDF: { format: "a4", orientation: "portrait" },
};

// Función para llamar a las opciones areaCv y Html2Pdf
function generateResume() {
  html2pdf(areaCv, opt);
}

// Cuando se hace clic en el botón, ejecuta las tres funciones
resumeButton.addEventListener("click", () => {
  // 1. Se agrega la clase .scale-cv al cuerpo, donde reduce el tamaño de los elementos.
  scaleCv();

  // 2. Se genera el PDF
  generateResume();

  // 3. La clase .scale-cv se elimina del cuerpo después de 5 segundos para volver al tamaño normal.
  setTimeout(removeScale, 5000);
});
