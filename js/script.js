// Valores generales
let currentTab = "categorias"; // Pestaña activa por defecto
// Definición de endpoints
const endpoints = {
  categorias: "Categorias",
  productos: "Productos",
  clientes: "Clientes",
  ordenes: "Ordenes",
  detalles: "Detalles",
};

// Configuración de columnas para cada endpoint
function getColumnsConfig(endpoint) {
  const configs = {
    categorias: [
      { data: "cat_id", title: "ID" },
      { data: "cat_nom", title: "Nombre" },
    ],
    productos: [
      { data: "pro_id", title: "ID" },
      { data: "pro_nom", title: "Nombre" },
      { data: "pro_pre", title: "Precio" },
      { data: "cat_id_FK", title: "Categoría" },
    ],
    clientes: [
      { data: "cli_id", title: "ID" },
      { data: "cli_nom", title: "Nombre" },
      { data: "cli_ema", title: "Email" },
    ],
    ordenes: [
      { data: "ord_id", title: "ID" },
      { data: "ord_fec", title: "Fecha" },
      { data: "cli_id_FK", title: "Cliente" },
    ],
    detalles: [
      { data: "det_id", title: "ID" },
      { data: "det_can", title: "Cantidad" },
      { data: "pro_id_FK", title: "Producto" },
      { data: "ord_id_FK", title: "Orden" },
    ],
  };

  return configs[endpoint.toLowerCase()] || [];
}

/* Función para cargar datos automáticamente al cambiar de pestaña
function fetchData(endpoint) {
  // 1. Primero inicializamos DataTable (sin animación)
  const table = $(`#${endpoint.toLowerCase()}Table`).DataTable({
    destroy: true,
    ajax: {
      url: `https://localhost:7129/api/${endpoint}`,
      dataSrc: "",
    },
    columns: getColumnsConfig(endpoint),
    // 2. Ocultamos la tabla inicialmente en la configuración
    initComplete: function () {
      $(`#${endpoint.toLowerCase()}Table`).hide().fadeIn(800);
    },
  });
}*/

let tableAnimationInProgress = false;

function fetchData(endpoint) {
  const tableElement = $(`#${endpoint.toLowerCase()}Table`);

  // Si hay una animación en curso, cancelarla
  if (tableAnimationInProgress) {
    tableElement.stop(true, true).find("tr").stop(true, true);
  }

  // Resetear el estado visual
  tableElement
    .css({
      opacity: 0,
      visibility: "visible",
      display: "table",
    })
    .find("tbody tr")
    .css({
      opacity: 0,
      transform: "translateX(20px)",
    });

  // Destruir DataTable existente si hay
  if ($.fn.DataTable.isDataTable(tableElement)) {
    tableElement.DataTable().destroy();
  }

  tableAnimationInProgress = true;

  const table = tableElement.DataTable({
    destroy: true,
    ajax: {
      url: `https://yorkapi.somee.com/api/${endpoint}`,
      dataSrc: "",
    },
    columns: getColumnsConfig(endpoint),
    initComplete: function () {
      // Animación principal de la tabla
      tableElement.animate(
        {
          opacity: 1,
        },
        {
          duration: 600,
          start: function () {
            // Animación escalonada de filas (comienza después de 200ms)
            setTimeout(() => {
              tableElement.find("tbody tr").each(function (i) {
                $(this)
                  .delay(i * 200)
                  .animate(
                    {
                      opacity: 1,
                      transform: "translateX(0)",
                    },
                    400,
                    "swing"
                  );
              });
            }, 200);
          },
          complete: function () {
            tableAnimationInProgress = false;
          },
        }
      );
    },
    drawCallback: function () {
      // Animación más simple para cambios de página
      tableElement
        .find("tbody tr")
        .css({
          opacity: 0,
          transform: "translateY(5px)",
        })
        .each(function (i) {
          $(this)
            .delay(i * 100)
            .animate(
              {
                opacity: 1,
                transform: "translateY(0)",
              },
              400
            );
        });
    },
  });
}

// Funciones de la interfaz
function openTab(evt, tabName) {
  // Oculta todos los contenidos de pestañas
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
  }

  // Desactiva todas las pestañas
  const tabs = document.getElementsByClassName("tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  // Activa la pestaña actual
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
  currentTab = tabName;

  // Cargar datos automáticamente al cambiar de pestaña
  fetchData(endpoints[tabName]);
}

// Inicializa la primera tabla al cargar
document.addEventListener("DOMContentLoaded", function () {
  fetchData(endpoints[currentTab]);
});

// Animacion del titulo
var wrapper = document.getElementsByClassName("text-animation")[0];
wrapper.style.opacity = "1";
wrapper.innerHTML = wrapper.textContent.replace(/./g, "<span>$&</span>");

var spans = wrapper.getElementsByTagName("span");

for (var i = 0; i < spans.length; i++) {
  spans[i].style.animationDelay = i * 80 + "ms";
}

// Boton regresar
document.getElementById("regresar").addEventListener("click", function () {
  window.location.href = "../index.html";
});

// Boton ver todas
document.getElementById("todas").addEventListener("click", function () {
  window.location.href = "todas.html";
});
