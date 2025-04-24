// Valores generales
let currentTab = "categorias";
let currentAction = "create"; // 'create' o 'update'
let currentId = null; // ID del registro actual para editar

// Definición de endpoints
const endpoints = {
  categorias: "Categorias",
  productos: "Productos",
  clientes: "Clientes",
  ordenes: "Ordenes",
  detalles: "Detalles",
};

// Configuración de columnas y formularios para cada endpoint
function getEntityConfig(endpoint) {
  const configs = {
    categorias: {
      columns: [
        { data: "cat_id", title: "ID" },
        { data: "cat_nom", title: "Nombre" },
        {
          data: null,
          title: "Acciones",
          render: function (data, type, row) {
            return `
              <button class="button is-small is-warning" onclick="showEditForm('${endpoint}', ${row.cat_id})">
                <span class="icon is-small">
                  <i class="fa fa-edit"></i>
                </span>
              </button>
              <button class="button is-small is-danger" onclick="confirmDelete('${endpoint}', ${row.cat_id})">
                <span class="icon is-small">
                  <i class="fa fa-trash"></i>
                </span>
              </button>
            `;
          },
          className: "action-cell",
        },
      ],
      formFields: [
        {
          name: "cat_nom",
          label: "Nombre",
          type: "text",
          required: true,
          placeholder: "Ingrese el nombre de la categoría",
        },
      ],
      primaryKey: "cat_id",
    },
    productos: {
      columns: [
        { data: "pro_id", title: "ID" },
        { data: "pro_nom", title: "Nombre" },
        { data: "pro_pre", title: "Precio" },
        { data: "cat_id_FK", title: "Categoría" },
        {
          data: null,
          title: "Acciones",
          render: function (data, type, row) {
            return `
              <button class="button is-small is-warning" onclick="showEditForm('${endpoint}', ${row.pro_id})">
                <span class="icon is-small">
                  <i class="fa fa-edit"></i>
                </span>
              </button>
              <button class="button is-small is-danger" onclick="confirmDelete('${endpoint}', ${row.pro_id})">
                <span class="icon is-small">
                  <i class="fa fa-trash"></i>
                </span>
              </button>
            `;
          },
          className: "action-cell",
        },
      ],
      formFields: [
        {
          name: "pro_nom",
          label: "Nombre",
          type: "text",
          required: true,
          placeholder: "Ingrese el nombre del producto",
        },
        {
          name: "pro_pre",
          label: "Precio",
          type: "number",
          required: true,
          step: "0.01",
          placeholder: "Ingrese el precio",
        },
        {
          name: "cat_id_FK",
          label: "Categoría",
          type: "number",
          required: true,
          placeholder: "Ingrese el ID de categoría",
        },
      ],
      primaryKey: "pro_id",
    },
    clientes: {
      columns: [
        { data: "cli_id", title: "ID" },
        { data: "cli_nom", title: "Nombre" },
        { data: "cli_ema", title: "Email" },
        {
          data: null,
          title: "Acciones",
          render: function (data, type, row) {
            return `
              <button class="button is-small is-warning" onclick="showEditForm('${endpoint}', ${row.cli_id})">
                <span class="icon is-small">
                  <i class="fa fa-edit"></i>
                </span>
              </button>
              <button class="button is-small is-danger" onclick="confirmDelete('${endpoint}', ${row.cli_id})">
                <span class="icon is-small">
                  <i class="fa fa-trash"></i>
                </span>
              </button>
            `;
          },
          className: "action-cell",
        },
      ],
      formFields: [
        {
          name: "cli_nom",
          label: "Nombre",
          type: "text",
          required: true,
          placeholder: "Ingrese el nombre del cliente",
        },
        {
          name: "cli_ema",
          label: "Email",
          type: "email",
          required: true,
          placeholder: "Ingrese el email del cliente",
        },
      ],
      primaryKey: "cli_id",
    },
    ordenes: {
      columns: [
        { data: "ord_id", title: "ID" },
        { data: "ord_fec", title: "Fecha" },
        { data: "cli_id_FK", title: "Cliente" },
        {
          data: null,
          title: "Acciones",
          render: function (data, type, row) {
            return `
              <button class="button is-small is-warning" onclick="showEditForm('${endpoint}', ${row.ord_id})">
                <span class="icon is-small">
                  <i class="fa fa-edit"></i>
                </span>
              </button>
              <button class="button is-small is-danger" onclick="confirmDelete('${endpoint}', ${row.ord_id})">
                <span class="icon is-small">
                  <i class="fa fa-trash"></i>
                </span>
              </button>
            `;
          },
          className: "action-cell",
        },
      ],
      formFields: [
        {
          name: "ord_fec",
          label: "Fecha",
          type: "datetime-local",
          required: true,
        },
        {
          name: "cli_id_FK",
          label: "ID Cliente",
          type: "number",
          required: true,
          placeholder: "Ingrese el ID del cliente",
        },
      ],
      primaryKey: "ord_id",
    },
    detalles: {
      columns: [
        { data: "det_id", title: "ID" },
        { data: "det_can", title: "Cantidad" },
        { data: "pro_id_FK", title: "Producto" },
        { data: "ord_id_FK", title: "Orden" },
        {
          data: null,
          title: "Acciones",
          render: function (data, type, row) {
            return `
              <button class="button is-small is-warning" onclick="showEditForm('${endpoint}', ${row.det_id})">
                <span class="icon is-small">
                  <i class="fa fa-edit"></i>
                </span>
              </button>
              <button class="button is-small is-danger" onclick="confirmDelete('${endpoint}', ${row.det_id})">
                <span class="icon is-small">
                  <i class="fa fa-trash"></i>
                </span>
              </button>
            `;
          },
          className: "action-cell",
        },
      ],
      formFields: [
        {
          name: "det_can",
          label: "Cantidad",
          type: "number",
          required: true,
          placeholder: "Ingrese la cantidad",
        },
        {
          name: "pro_id_FK",
          label: "ID Producto",
          type: "number",
          required: true,
          placeholder: "Ingrese el ID del producto",
        },
        {
          name: "ord_id_FK",
          label: "ID Orden",
          type: "number",
          required: true,
          placeholder: "Ingrese el ID de la orden",
        },
      ],
      primaryKey: "det_id",
    },
  };

  return configs[endpoint.toLowerCase()] || { columns: [], formFields: [] };
}

let tableAnimationInProgress = false;

function fetchData(endpoint) {
  const tableElement = $(`#${endpoint.toLowerCase()}Table`);
  const config = getEntityConfig(endpoint);

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
    columns: config.columns,
    language: {
      decimal: "",
      emptyTable: "No hay datos disponibles en la tabla",
      info: "Mostrando del _START_ al _END_ de _TOTAL_ registros",
      infoEmpty: "Mostrando 0 registros",
      infoFiltered: "(filtrados de un total de _MAX_ registros)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ registros por página",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "No se encontraron registros coincidentes",
      paginate: {
        first: "◁◁",
        last: "▷▷",
        next: "▷",
        previous: "◁",
      },
    },
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

// Funciones para el CRUD
function showCreateForm() {
  currentAction = "create";
  currentId = null;
  const endpoint = endpoints[currentTab];
  const config = getEntityConfig(endpoint);

  document.getElementById("modalTitle").textContent = `Nuevo ${currentTab}`;
  const form = document.getElementById("crudForm");
  form.innerHTML = "";

  // Generar campos del formulario
  config.formFields.forEach((field) => {
    const div = document.createElement("div");
    div.className = "field";

    const label = document.createElement("label");
    label.className = "label";
    label.textContent = field.label;
    div.appendChild(label);

    const control = document.createElement("div");
    control.className = "control";

    const input = document.createElement("input");
    input.className = "input";
    input.type = field.type;
    input.name = field.name;
    input.placeholder = field.placeholder || "";
    input.required = field.required || false;

    if (field.type === "number" && field.step) {
      input.step = field.step;
    }

    control.appendChild(input);
    div.appendChild(control);

    form.appendChild(div);
  });

  // Mostrar el modal
  document.getElementById("crudModal").classList.add("is-active");
}

function showEditForm(endpoint, id) {
  currentAction = "update";
  currentId = id;
  const config = getEntityConfig(endpoint);

  // Obtener los datos del registro
  $.ajax({
    url: `https://yorkapi.somee.com/api/${endpoint}/${id}`,
    method: "GET",
    success: function (data) {
      document.getElementById("modalTitle").textContent = `Editar ${endpoint}`;
      const form = document.getElementById("crudForm");
      form.innerHTML = "";

      // Generar campos del formulario con los datos
      config.formFields.forEach((field) => {
        const div = document.createElement("div");
        div.className = "field";

        const label = document.createElement("label");
        label.className = "label";
        label.textContent = field.label;
        div.appendChild(label);

        const control = document.createElement("div");
        control.className = "control";

        const input = document.createElement("input");
        input.className = "input";
        input.type = field.type;
        input.name = field.name;
        input.placeholder = field.placeholder || "";
        input.required = field.required || false;
        input.value = data[field.name] || "";

        if (field.type === "datetime-local" && data[field.name]) {
          // Formatear fecha para el input datetime-local
          const date = new Date(data[field.name]);
          const formattedDate = date.toISOString().slice(0, 16);
          input.value = formattedDate;
        }

        if (field.type === "number" && field.step) {
          input.step = field.step;
        }

        control.appendChild(input);
        div.appendChild(control);

        form.appendChild(div);
      });

      // Mostrar el modal
      document.getElementById("crudModal").classList.add("is-active");
    },
    error: function (error) {
      console.error("Error al obtener datos:", error);
      alert("Error al cargar los datos para editar");
    },
  });
}

function closeModal() {
  document.getElementById("crudModal").classList.remove("is-active");
}

function submitForm() {
  const endpoint = endpoints[currentTab];
  const config = getEntityConfig(endpoint);
  const formData = {};

  // Recoger datos del formulario
  const inputs = document.querySelectorAll("#crudForm input");
  inputs.forEach((input) => {
    if (input.type === "datetime-local") {
      // Formatear fecha para enviar al servidor
      formData[input.name] = new Date(input.value).toISOString();
    } else if (input.type === "number") {
      formData[input.name] = parseFloat(input.value);
    } else {
      formData[input.name] = input.value;
    }
  });

  // Determinar la URL y el método HTTP según la acción
  let url, method;
  if (currentAction === "create") {
    url = `https://yorkapi.somee.com/api/${endpoint}`;
    method = "POST";
  } else {
    url = `https://yorkapi.somee.com/api/${endpoint}/${currentId}`;
    method = "PUT";
  }

  // Enviar datos al servidor
  $.ajax({
    url: url,
    method: method,
    contentType: "application/json",
    data: JSON.stringify(formData),
    success: function () {
      closeModal();
      fetchData(endpoint); // Recargar los datos
      showNotification(
        `Registro ${
          currentAction === "create" ? "creado" : "actualizado"
        } con éxito`,
        "success"
      );
    },
    error: function (error) {
      console.error("Error:", error);
      showNotification(
        `Error al ${
          currentAction === "create" ? "crear" : "actualizar"
        } el registro`,
        "danger"
      );
    },
  });
}

function confirmDelete(endpoint, id) {
  if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
    deleteRecord(endpoint, id);
  }
}

function deleteRecord(endpoint, id) {
  $.ajax({
    url: `https://yorkapi.somee.com/api/${endpoint}/${id}`,
    method: "DELETE",
    success: function () {
      fetchData(endpoint); // Recargar los datos
      showNotification("Registro eliminado con éxito", "success");
    },
    error: function (error) {
      console.error("Error:", error);
      showNotification("Error al eliminar el registro", "danger");
    },
  });
}

function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification is-${type}`;
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.zIndex = "1000";
  notification.style.maxWidth = "300px";
  notification.style.animation = "fadeIn 0.3s";

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.onclick = function () {
    notification.style.animation = "fadeOut 0.3s";
    setTimeout(() => notification.remove(), 300);
  };

  notification.appendChild(deleteButton);
  notification.appendChild(document.createTextNode(message));

  document.body.appendChild(notification);

  // Eliminar automáticamente después de 3 segundos
  setTimeout(() => {
    notification.style.animation = "fadeOut 0.3s";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Inicializa la primera tabla al cargar
document.addEventListener("DOMContentLoaded", function () {
  fetchData(endpoints[currentTab]);

  // Agregar estilos para las notificaciones
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(10px); }
    }
  `;
  document.head.appendChild(style);
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
