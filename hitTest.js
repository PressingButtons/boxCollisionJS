import Rect from "./geojs/rect.js";
import Vector from "./geojs/vector.js";

export function pointToBox(px, py, x1, y1, x2, y2) {
    return (px >= x1 && px <= x2 && py >= y1 && py <= y2);
}

/**
 * @param {Rect} a 
 * @param {Rect} b 
 * @returns 
 */

export function boxToBox(a, b) {
    return (a.left <= b.right && a.right >= b.left && a.top <= b.bottom && a.bottom >= b.top);
}

/**
 * 
 * @param {Vector} origin 
 * @param {Vector} vector 
 * @param {Rect} rect 
 */
export function rayToBox(origin, vector, rect) {
    const near = new Vector(rect.left, rect.top, 0); 
    near.subtract(origin); near.divide(vector);
    const far = new Vector(rect.right, rect.bottom, 0);
    far.subtract(origin); far.divide(vector);
    const near_x = Math.min(near.x, far.x);
    const far_x  = Math.max(near.x, far.x);
    const near_y = Math.min(near.y, far.y);
    const far_y = Math.max(near.y, far.y);
    if (near_x > far_y || near_y > far_x) return false;

    const t_hit_near = Math.max(near.x, near.y);
    const t_hit_far  = Math.min(far.x, far.y);

    if(t_hit_far < 0) return false;

}