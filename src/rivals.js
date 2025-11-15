import Chart from "chart.js/auto";

async function getPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
  const data = await response.json();
  return data;
}

async function getPokemonTypes(pokemonList) {
  const types = {};
  const typeTranslations = {
    normal: "Normal",
    fire: "Fuego",
    water: "Agua",
    electric: "Eléctrico",
    grass: "Planta",
    ice: "Hielo",
    fighting: "Lucha",
    poison: "Veneno",
    ground: "Tierra",
    flying: "Volador",
    psychic: "Psíquico",
    bug: "Bicho",
    rock: "Roca",
    ghost: "Fantasma",
    dragon: "Dragón",
    dark: "Siniestro",
    steel: "Acero",
    fairy: "Hada"
  };
  
  for (const pokemon of pokemonList) {
    const response = await fetch(pokemon.url);
    const details = await response.json();
    const primaryType = details.types[0].type.name;
    const translatedType = typeTranslations[primaryType] || primaryType;
    types[translatedType] = (types[translatedType] || 0) + 1;
  }
  
  return types;
}

async function init() {
  const data = await getPokemon();
  console.log(data.results);
  
  const types = await getPokemonTypes(data.results);
  
  const labels = Object.keys(types);
  const values = Object.values(types);

  const ctx = document.getElementById("rivals").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Cantidad de Pokémon",
          data: values,
          backgroundColor: [
            "rgba(99, 255, 132, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(199, 199, 199, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 255, 0.6)",
          ],
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Distribución de Pokémon por Tipo",
          font: {
            size: 20
          }
        }
      }
    }
  });
}

init();