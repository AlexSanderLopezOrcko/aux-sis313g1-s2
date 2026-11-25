const main = document.getElementById("main");
/*
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");

btnLeft.addEventListener("click", () => {
  main.scrollBy({ left: -main.clientWidth, behavior: "smooth" });
});

btnRight.addEventListener("click", () => {
  main.scrollBy({ left: main.clientWidth, behavior: "smooth" });
});
*/

document.addEventListener("keydown", (event) => {
  // Si se está escribiendo en el input, las flechas no cambian de slide
  if (event.target.matches("input, textarea")) return;
  if (event.key === "ArrowRight") {
    main.scrollBy({ left: main.clientWidth, behavior: "smooth" });
  }
  if (event.key === "ArrowLeft") {
    main.scrollBy({ left: -main.clientWidth, behavior: "smooth" });
  }
});

const API_KEY = "TuclaveApi";
const MODELOS = [
  "gemini-3.5-flash-lite",
  "gemini-flash-lite-latest",
  "gemini-3.5-flash",
  "gemini-flash-latest",
];

const recuadro = document.getElementById("recuadro");
const entrada = document.getElementById("entrada");

entrada.addEventListener("keydown", async (event) => {
  if (event.key !== "Enter") return;

  const pregunta = entrada.value.trim();
  if (pregunta === "") return;

  entrada.value = "";
  recuadro.textContent = "Pensando...";

  let ultimoError = "";

  for (const modelo of MODELOS) {
    try {
      const url =
        "https://generativelanguage.googleapis.com/v1beta/models/" +
        modelo +
        ":generateContent";

      const respuesta = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: pregunta }] }],
        }),
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        const texto = datos.candidates[0].content.parts[0].text;
        recuadro.textContent = texto.replaceAll("**", "");
        return;
      }

      ultimoError = datos.error.message;
    } catch (error) {
      ultimoError = "No se pudo conectar con Gemini.";
    }
  }

  recuadro.textContent = "Error: " + ultimoError;
});
