const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  e.key === " " ? setRandomColors() : "";
});

function generateColor() {
  const hexCode = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCode[Math.floor(Math.random() * hexCode.length)];
  }
  return "#" + color;
}

function setRandomColors() {
  const colors = [];
  cols.forEach((col) => {
    const text = col.querySelector("h2");
    const btn = col.querySelector("button");
    const color = generateColor();

    if (btn.querySelector("i").classList.contains("fa-lock-open")) {
      text.textContent = color;
      col.style.background = color;
      setTextColor(text, color);
      setTextColor(btn, color);
      colors.push(color);
    }
  });
  return colors;
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance < 0.5 ? "white" : "black";
}
function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

function toggleLock() {
  document.addEventListener("click", (e) => {
    const type = e.target.dataset.type;
    if (type === "lock") {
      const node =
        e.target.tagName.toLowerCase() === "i"
          ? e.target
          : e.target.children[0];

      node.classList.toggle("fa-lock-open");
      node.classList.toggle("fa-lock");
    } else if (type === "copy") {
      copyToClipboard(e.target.textContent);
    }
  });
}

console.log(setRandomColors().toString());

toggleLock();
setRandomColors();
