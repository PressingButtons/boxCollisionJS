export function pointToBox(px, py, x1, y1, x2, y2) {
    return (px >= x1 && px <= x2 && py >= y1 && py <= y2);
}

export function boxToBox(a, b) {
    return (a.left <= b.right && a.right >= b.left && a.top <= b.bottom && a.bottom >= b.top);
}
