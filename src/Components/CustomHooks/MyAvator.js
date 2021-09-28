const MyAvator = (
  text,
  foregroundColor = "white",
  backgroundColor = "black"
) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  // const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  canvas.width = 45;
  canvas.height = 45;

  // Draw background
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text
  context.font = "bold 35px Assistant";
  context.fillStyle = foregroundColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL("image/png");
};
export default MyAvator;
