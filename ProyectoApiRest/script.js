const libros = document.getElementById("lista-libros");

//GET - MOSTRAR
async function mostrarLibros(filtro = "") {
  const rest = await fetch(
    "https://biblioteca-api-gr4u.onrender.com/api/v1/libros",
  );
  const datos = await rest.json();

  const texto = filtro.trim().toLowerCase();
  const resultado = datos.filter(
    (i) =>
      i.titulo.toLowerCase().includes(texto) ||
      i.autor.nombre.toLowerCase().includes(texto),
  );

  libros.innerHTML = "";

  if (resultado.length === 0) {
    libros.innerHTML = "<p>No se encontraron libros.</p>";
    return;
  }

  resultado.forEach((i) => {
    libros.innerHTML += `
        <div class="libro">
            <img
              class="portada"
              src="${i.imagen_url}"
            />
            <h3>${i.titulo}</h3>
            <p><strong>Autor:</strong> ${i.autor.nombre}</p>
            <p><strong>Año:</strong> ${i.anio}</p>
            <p><strong>Categoría:</strong>${i.categoria.nombre}</p>
            <div class="acciones">
              <button class="btn-ver">Ver</button>
              <button class="btn-eliminar" onclick="eliminarLibro(${i.id})">Eliminar</button>
            </div>
        </div>
    `;
  });
}

mostrarLibros();

const categoria = document.getElementById("categoria");

async function mostrarCategoria() {
  const rest = await fetch(
    "https://biblioteca-api-gr4u.onrender.com/api/v1/categorias",
  );

  const datos = await rest.json();
  console.log(datos);

  datos.forEach((element) => {
    categoria.innerHTML += `
        <option value="${element.id}">${element.nombre}</option>
    `;
  });
}

mostrarCategoria();

const autores = document.getElementById("autor");

async function mostrarAutores() {
  const rest = await fetch(
    "https://biblioteca-api-gr4u.onrender.com/api/v1/autores",
  );
  const datos = await rest.json();
  console.log(datos);

  datos.forEach((element) => {
    autores.innerHTML += `
        <option value="${element.id}">${element.nombre}</option>
    `;
  });
}

mostrarAutores();

const listaAutores = document.getElementById("lista-autores");

async function mostrarListaAutores() {
  const rest = await fetch(
    "https://biblioteca-api-gr4u.onrender.com/api/v1/autores",
  );
  const datos = await rest.json();

  listaAutores.innerHTML = "";

  datos.forEach((element) => {
    listaAutores.innerHTML += `
      <tr>
          <td>${element.nombre}</td>
          <td>${element.nacionalidad}</td>
      </tr>
    `;
  });
}

mostrarListaAutores();

const listaCategorias = document.getElementById("lista-categorias");

async function mostrarListaCategorias() {
  const rest = await fetch(
    "https://biblioteca-api-gr4u.onrender.com/api/v1/categorias",
  );
  const datos = await rest.json();
  listaCategorias.innerHTML = "";
  datos.forEach((element) => {
    listaCategorias.innerHTML += `
      <tr>
          <td>${element.nombre}</td>
          <td>${element.descripcion}</td>
      </tr>
    `;
  });
}

mostrarListaCategorias();

//METODO POST - CREAR - AUTOR

const crearAutor = document.getElementById("CrearAutor");
const autorNombre = document.getElementById("autor-nombre");
const autorNacionalidad = document.getElementById("autor-nacionalidad");

crearAutor.addEventListener("click", async (e) => {
  e.preventDefault();
  await fetch("https://biblioteca-api-gr4u.onrender.com/api/v1/autores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: autorNombre.value,
      nacionalidad: autorNacionalidad.value,
    }),
  });
  autorNombre.value = "";
  autorNacionalidad.value = "";
  mostrarListaAutores();
});

//METODO POST - CREAR - CATEGORIA

const crearCategoria = document.getElementById("crear-categoria");
const categoriaNombre = document.getElementById("categoria-nombre");
const categoriaDescripcion = document.getElementById("categoria-descripcion");

crearCategoria.addEventListener("click", async (e) => {
  e.preventDefault();
  await fetch("https://biblioteca-api-gr4u.onrender.com/api/v1/categorias", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: categoriaNombre.value,
      descripcion: categoriaDescripcion.value,
    }),
  });
  categoriaNombre.value = "";
  categoriaDescripcion.value = "";
  mostrarListaCategorias();
});

//METODO POST - CREAR - LIBRO

const formLibro = document.getElementById("form-libro");

formLibro.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetch("https://biblioteca-api-gr4u.onrender.com/api/v1/libros", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titulo: document.getElementById("titulo").value,
      autor_id: Number(document.getElementById("autor").value),
      anio: Number(document.getElementById("anio").value),
      categoria_id: Number(document.getElementById("categoria").value),
      imagen_url: document.getElementById("imagen").value,
    }),
  });
  formLibro.reset();
  mostrarLibros();
});

//DELETE - ELIMINAR

async function eliminarLibro(id) {
  await fetch(`https://biblioteca-api-gr4u.onrender.com/api/v1/libros/${id}`, {
    method: "DELETE",
  });

  mostrarLibros(busqueda.value);
}

//BUSCAR

const formBuscar = document.getElementById("form-buscar");
const busqueda = document.getElementById("busqueda");

formBuscar.addEventListener("submit", (e) => {
  e.preventDefault();
  mostrarLibros(busqueda.value);
});

busqueda.addEventListener("input", () => {
  mostrarLibros(busqueda.value);
});
