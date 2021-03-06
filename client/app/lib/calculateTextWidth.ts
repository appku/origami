const canvas = document.createElement("canvas");
canvas.style.display = "none";
// eslint-disable-next-line compat/compat
document.body.appendChild(canvas);

// eslint-disable-next-line compat/compat
export function calculateTextWidth(text: string, container = document.body) {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const containerStyle = window.getComputedStyle(container);
    ctx.font = `${containerStyle.fontSize} ${containerStyle.fontFamily}`;
    const textMetrics = ctx.measureText(text);
    let actualWidth = textMetrics.width;
    if ("actualBoundingBoxLeft" in textMetrics) {
      // only available on evergreen browsers
      actualWidth = Math.abs(textMetrics.actualBoundingBoxLeft) + Math.abs(textMetrics.actualBoundingBoxRight);
    }
    return actualWidth;
  }

  return null;
}
