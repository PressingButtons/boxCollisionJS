import Line from "./geojs/line.js";
import Point from "./geojs/point.js";
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
 * @param {Line} ray
 * @param {Rect} rect 
 * @param {Point} contact_point 
 * @param {Point} contact_normal 
 * @param {Number} t_hit_near 
 * @returns 
 */
export function rayToBox(ray, rect, contact_point, contact_normal, t_hit) {
    const t_near = new Vector(...rect.top_left, 0).subtract(...ray.origin).divide(...ray.vector);
    const t_far  = new Vector(...rect.bottom_right, 0).subtract(...ray.origin).divide(...ray.vector);
    //sort near and far values 
    if(t_near.x > t_far.x) [t_near.x, t_far.x] = [t_far.x, t_near.x];
    if(t_near.y > t_far.y) [t_near.y, t_far.y] = [t_far.y, t_near.y];
    //first failure condition - 
    if(t_near.x > t_far.y || t_near.y > t_far.x) return false;
    //t value for collisions
    t_hit[0] = Math.max(t_near.x, t_near.y);
    t_hit[1] = Math.min(t_far.x, t_far.y);
    //check if ray is in direction for collision
    if(t_hit[1] < 0) return false;
    //update contact point
    contact_point.setValue(...ray.vector).multiplyScalar(t_hit[0]).add(...ray.origin);
    //normals
    if(t_near.x > t_near.y) 
        if(ray.vector[0] < 0) contact_normal.setValue(1, 0);
        else contact_normal.setValue(-1, 0);
    else if(t_near.x < t_near.y)
        if(ray.vector[1] < 0) contact_normal.setValue(0, 1);
        else contact_normal.setValue(0, -1);
    //collision detected
    return true;
}
