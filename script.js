document.addEventListener("DOMContentLoaded", function () {
  // Инициализация карты
  const map = L.map("map").setView([40.4093, 49.8671], 7);

  // --- Слайдер ---
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  showSlide(currentIndex);

  // Подключение базового слоя карты
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Массив с данными о локациях
  const locations = [
    {
      name: "Sheki",
      coords: [41.1919, 47.1706],
      description: "A historic city famous for the Sheki Khan's Palace.",
    },
    {
      name: "Baku",
      coords: [40.4093, 49.8671],
      description:
        "The capital city of Azerbaijan, known for its Flame Towers.",
    },
    {
      name: "Ganja",
      coords: [40.6828, 46.3606],
      description:
        "A city known for its historical landmarks and beautiful nature.",
    },
  ];

  // Добавление маркеров на карту
  const markers = []; // Массив для хранения маркеров
  locations.forEach((location) => {
    const marker = L.marker(location.coords)
      .addTo(map)
      .bindPopup("<h3>${location.name}</h3><p>${location.description}</p>");
    markers.push(marker); // Сохраняем маркер в массив
  });

  // Функция для перемещения карты к определённому месту
  function moveToLocation(coords, zoomLevel) {
    map.setView(coords, zoomLevel); // Устанавливаем вид на заданные координаты
  }

  // Кнопка для перемещения к Баку
  const goToBakuButton = document.createElement("button");
  goToBakuButton.innerText = "Go to Baku";
  goToBakuButton.style.padding = "10px 20px";
  goToBakuButton.style.margin = "10px";
  goToBakuButton.style.backgroundColor = "#2c3e50";
  goToBakuButton.style.color = "white";
  goToBakuButton.style.border = "none";
  goToBakuButton.style.cursor = "pointer";
  goToBakuButton.style.borderRadius = "5px";

  goToBakuButton.addEventListener("click", () => {
    moveToLocation([40.4093, 49.8671], 12); // Координаты Баку с зумом 12
  });

  // Кнопка для показа всех маркеров
  const showAllMarkersButton = document.createElement("button");
  showAllMarkersButton.innerText = "Show all markers";
  showAllMarkersButton.style.padding = "10px 20px";
  showAllMarkersButton.style.margin = "10px";
  showAllMarkersButton.style.backgroundColor = "#27ae60";
  showAllMarkersButton.style.color = "white";
  showAllMarkersButton.style.border = "none";
  showAllMarkersButton.style.cursor = "pointer";
  showAllMarkersButton.style.borderRadius = "5px";

  showAllMarkersButton.addEventListener("click", () => {
    const group = new L.featureGroup(markers); // Создаём группу из маркеров
    map.fitBounds(group.getBounds(), { padding: [50, 50] }); // Устанавливаем карту так, чтобы все маркеры были видны
  });

  // Добавляем кнопки на страницу
  document.body.appendChild(goToBakuButton);
  document.body.appendChild(showAllMarkersButton);
});

// Показ кнопки "Наверх" при прокрутке
const scrollTopButton = document.createElement("button");
scrollTopButton.classList.add("scroll-top-btn");
scrollTopButton.innerHTML = "↑";
document.body.appendChild(scrollTopButton);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopButton.classList.add("show");
  } else {
    scrollTopButton.classList.remove("show");
  }
});

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
