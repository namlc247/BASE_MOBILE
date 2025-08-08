class ColorUtil {
  static lightenColor = (color: string, amount: number) => {
    let col = color.replace("#", "");
    let r = parseInt(col.substring(0, 2), 16);
    let g = parseInt(col.substring(2, 4), 16);
    let b = parseInt(col.substring(4, 6), 16);

    r = Math.min(255, r + (255 - r) * amount);
    g = Math.min(255, g + (255 - g) * amount);
    b = Math.min(255, b + (255 - b) * amount);

    return `rgb(${r}, ${g}, ${b})`;
  };
}

export default ColorUtil;
