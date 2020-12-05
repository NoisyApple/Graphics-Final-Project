import { Vector3 } from "three";

const normalizeRadius = (vector) => {
  let { x, y, z } = vector;
  let { p, theta, phi } = rectToSph({ x, y, z });

  p = 1.7320508075689;

  let normCoords = sphToRect({ p, theta, phi });

  return new Vector3(normCoords.x, normCoords.y, normCoords.z);
};

const sphToRect = ({ p, theta, phi }) => {
  let x = p * Math.sin(theta) * Math.cos(phi);
  let y = p * Math.sin(theta) * Math.sin(phi);
  let z = p * Math.cos(theta);
  return { x, y, z };
};

const rectToSph = ({ x, y, z }) => {
  let p = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  let theta = Math.acos(z / p);
  let phi = Math.atan2(y, x);
  return { p, theta, phi };
};

export { normalizeRadius, sphToRect, rectToSph };
