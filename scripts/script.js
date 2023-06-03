const accordion_item = document.querySelectorAll(".accordion_item");

accordion_item.forEach((item) => {
  const accordion_header_item = item.querySelector(".accordion_header");

  accordion_header_item.addEventListener("click", () => {
    const accordion_content_item = item.querySelector(".accordion_content");

    const item_actived = document.querySelector(".active");

    VerifyActive(item, accordion_content_item, item_actived);
  });
});

function VerifyActive(item, content, content_actived) {
  const icon_item = item.querySelector(".icon");
  const icon_item_active = document.querySelectorAll(".icon");

  icon_item_active.forEach((item) => (item.innerHTML = "^"));

  if (content_actived) {
    content_actived.style.height = 0;
    content_actived.classList.remove("active");
  }

  if (content !== content_actived) {
    icon_item.innerHTML = "v";
    content.classList.add("active");
    content.style.height = content.scrollHeight + 10 + "px";
  }
}

let valueDisplays = document.querySelectorAll(".number-counter");
let interval = 5000;

// Função para verificar se o elemento está visível no viewport
function isElementVisible(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Função para animar o contador
function animateCounter(element) {
  let startValue = 0;
  let endValue = parseInt(element.getAttribute("finalValue"));
  let duration = Math.floor(interval / endValue);
  let counter = setInterval(function() {
    startValue += 5;
    element.textContent = startValue + "+";
    if (startValue >= endValue) {
      clearInterval(counter);
    }
  }, duration);
}

// Observador de interseção para ativar o contador quando o elemento estiver visível
let observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

// Observar cada elemento com a classe "number-counter"
valueDisplays.forEach(valueDisplay => {
  observer.observe(valueDisplay);
});
