from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
ICON_DIR = ROOT / "icons"
ICON_DIR.mkdir(exist_ok=True)


def mix(start, end, amount):
    return tuple(round(a + (b - a) * amount) for a, b in zip(start, end))


def make_icon(size):
    scale = size / 512
    image = Image.new("RGB", (size, size))
    pixels = image.load()
    for y in range(size):
        for x in range(size):
            amount = (x + y) / (size * 2)
            pixels[x, y] = mix((55, 48, 163), (124, 58, 237), amount)

    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=round(112 * scale), outline=None)
    draw.ellipse((350 * scale, 74 * scale, 426 * scale, 150 * scale), fill="#FBBF24")

    book = [
        (92, 164), (145, 147), (205, 168), (256, 208),
        (307, 168), (367, 147), (420, 164), (420, 364),
        (360, 348), (307, 361), (256, 397), (205, 361),
        (152, 348), (92, 364)
    ]
    draw.polygon([(x * scale, y * scale) for x, y in book], fill="white")
    width = max(2, round(9 * scale))
    draw.line((256 * scale, 207 * scale, 256 * scale, 397 * scale), fill="#C7D2FE", width=width)
    for y, left, right in [(228, 138, 218), (276, 138, 218), (228, 295, 375), (276, 295, 356)]:
        draw.line((left * scale, y * scale, right * scale, y * scale), fill="#4F46E5", width=width)
    draw.line(
        (302 * scale, 326 * scale, 332 * scale, 356 * scale, 397 * scale, 291 * scale),
        fill="#16A34A",
        width=max(3, round(14 * scale)),
        joint="curve"
    )
    return image


for icon_size in (180, 512):
    make_icon(icon_size).save(ICON_DIR / f"icon-{icon_size}.png", "PNG", optimize=True)
