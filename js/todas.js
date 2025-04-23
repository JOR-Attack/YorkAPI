$(document).ready(function () {
  // Definición de endpoints y configuración
  const apiConfig = {
    categorias: {
      endpoint: "Categorias",
      columns: [
        { data: "cat_id", title: "ID" },
        { data: "cat_nom", title: "Nombre" },
      ],
    },
    productos: {
      endpoint: "Productos",
      columns: [
        { data: "pro_id", title: "ID" },
        { data: "pro_nom", title: "Nombre" },
        { data: "pro_pre", title: "Precio" },
        { data: "cat_id_FK", title: "Categoría" },
      ],
    },
    clientes: {
      endpoint: "Clientes",
      columns: [
        { data: "cli_id", title: "ID" },
        { data: "cli_nom", title: "Nombre" },
        { data: "cli_ema", title: "Email" },
      ],
    },
    ordenes: {
      endpoint: "Ordenes",
      columns: [
        { data: "ord_id", title: "ID" },
        { data: "ord_fec", title: "Fecha" },
        { data: "cli_id_FK", title: "Cliente" },
      ],
    },
    detalles: {
      endpoint: "Detalles",
      columns: [
        { data: "det_id", title: "ID" },
        { data: "det_can", title: "Cantidad" },
        { data: "pro_id_FK", title: "Producto" },
        { data: "ord_id_FK", title: "Orden" },
      ],
    },
  };

  // URL base de tu API (ajusta según tu configuración)
  const apiBaseUrl = "https://localhost:7087/api/";

  // Función para inicializar una tabla
  function initDataTable(tableId, config) {
    const tableElement = $(`#${tableId}`);

    if (tableElement.length) {
      tableElement.DataTable({
        ajax: {
          url: apiBaseUrl + config.endpoint,
          dataSrc: "",
        },
        columns: config.columns,
        responsive: true,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json",
        },
      });
    }
  }

  // Inicializar todas las tablas
  Object.keys(apiConfig).forEach((tableId) => {
    initDataTable(tableId, apiConfig[tableId]);
  });
});

// Boton Regresar
document.getElementById("regresar").addEventListener("click", function () {
  window.location.href = "api.html";
});
