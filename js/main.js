// Función para convertir un número a hexadecimal con dos dígitos
function toHex(n) {
  let hex = Number(n).toString(16).toUpperCase();
  return hex.length === 1 ? "0" + hex : hex;
}

// Función para actualizar la vista previa y sincronizar todos los controles
function updateColor() {
  // Obtener valores de los sliders
  const red = document.getElementById("red").value;
  const green = document.getElementById("green").value;
  const blue = document.getElementById("blue").value;

  // Actualizar los badges
  document.getElementById("redValue").textContent = red;
  document.getElementById("greenValue").textContent = green;
  document.getElementById("blueValue").textContent = blue;

  // Actualizar los inputs numéricos para sincronizarlos
  document.getElementById("redDecimal").value = red;
  document.getElementById("greenDecimal").value = green;
  document.getElementById("blueDecimal").value = blue;

  // Construir el string RGB y el código hexadecimal
  const rgbString = `rgb(${red}, ${green}, ${blue})`;
  const hexString = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;

  // Actualizar el recuadro de vista previa y el código hexadecimal
  document.getElementById("colorPreview").style.backgroundColor = rgbString;
  document.getElementById("hexCode").textContent = hexString;

  // Sincronizar el input color picker
  document.getElementById("colorPicker").value = hexString;
}

// Función para actualizar sliders a partir de los inputs numéricos
function updateFromDecimal(event) {
  const id = event.target.id;
  let value = event.target.value;
  
  // Validar que el valor esté entre 0 y 255, en caso contrario corregirlo
  if (value === "" || isNaN(value)) {
    value = 0;
  }
  value = Math.max(0, Math.min(255, value));
  event.target.value = value; // actualizar el input si se corrige el valor

  // Actualizar el slider correspondiente
  if (id === "redDecimal") {
    document.getElementById("red").value = value;
  } else if (id === "greenDecimal") {
    document.getElementById("green").value = value;
  } else if (id === "blueDecimal") {
    document.getElementById("blue").value = value;
  }
  
  // Actualizar la vista de color
  updateColor();
}

// Función para actualizar controles a partir del color seleccionado en el color picker
function updateFromColorPicker(event) {
  const hex = event.target.value;
  
  // Convertir el hexadecimal a valores decimales
  const red = parseInt(hex.substr(1,2), 16);
  const green = parseInt(hex.substr(3,2), 16);
  const blue = parseInt(hex.substr(5,2), 16);

  // Actualizar sliders e inputs numéricos
  document.getElementById("red").value = red;
  document.getElementById("green").value = green;
  document.getElementById("blue").value = blue;

  document.getElementById("redDecimal").value = red;
  document.getElementById("greenDecimal").value = green;
  document.getElementById("blueDecimal").value = blue;

  // Actualizar la vista de color
  updateColor();
}

// Agregar event listeners a los controles de rango
document.querySelectorAll('input[type="range"]').forEach(input => {
  input.addEventListener("input", updateColor);
});

// Agregar event listeners a los inputs numéricos
document.querySelectorAll('input[type="number"]').forEach(input => {
  input.addEventListener("input", updateFromDecimal);
});

// Agregar event listener al color picker
document.getElementById("colorPicker").addEventListener("input", updateFromColorPicker);

// Inicializar la vista con los valores por defecto
updateColor();
