import { Vector3, Face3 } from "three";

const tetrahedronShape = () => {
  let vertices = [
    new Vector3(1, 1, 1),
    new Vector3(-1, 1, -1),
    new Vector3(-1, -1, 1),
    new Vector3(1, -1, -1),
  ];

  let faces = [
    new Face3(0, 3, 1),
    new Face3(1, 3, 2),
    new Face3(2, 3, 0),
    new Face3(0, 1, 2),
  ];

  let radius = Math.sqrt(3);

  return { vertices, faces, radius };
};

const octahedronShape = () => {
  let vertices = [
    new Vector3(-1, 0, 0),
    new Vector3(1, 0, 0),
    new Vector3(0, -1, 0),
    new Vector3(0, 1, 0),
    new Vector3(0, 0, -1),
    new Vector3(0, 0, 1),
  ];

  let faces = [
    new Face3(0, 2, 5),
    new Face3(2, 1, 5),
    new Face3(1, 3, 5),
    new Face3(3, 0, 5),
    new Face3(0, 2, 4),
    new Face3(2, 1, 4),
    new Face3(1, 3, 4),
    new Face3(3, 0, 4),
  ];

  let radius = 1;

  return { vertices, faces, radius };
};

const icosahedronShape = () => {
  let phi = (1 + Math.sqrt(5)) / 2;

  let vertices = [
    new Vector3(0, -1, -phi), // 0 A
    new Vector3(0, -1, phi), // 1 B
    new Vector3(0, 1, -phi), // 2 C
    new Vector3(0, 1, phi), // 3 D
    new Vector3(-1, -phi, 0), // 4 E
    new Vector3(-1, phi, 0), // 5 F
    new Vector3(1, -phi, 0), // 6 G
    new Vector3(1, phi, 0), // 7 H
    new Vector3(-phi, 0, -1), // 8 I
    new Vector3(phi, 0, -1), // 9 J
    new Vector3(-phi, 0, 1), // 10 K
    new Vector3(phi, 0, 1), // 11 L
  ];

  let faces = [
    new Face3(6, 9, 0),
    new Face3(9, 2, 0),
    new Face3(2, 8, 0),
    new Face3(8, 4, 0),
    new Face3(4, 6, 0),
    new Face3(5, 10, 3), //F,K,D
    new Face3(10, 1, 3), // K,B,D
    new Face3(1, 11, 3), // B,L,D
    new Face3(11, 7, 3), // L, H, D
    new Face3(7, 5, 3), // H,F,D
    new Face3(4, 1, 6), // EBG
    new Face3(6, 1, 11), // GBL
    new Face3(11, 6, 9), // LGJ
    new Face3(9, 11, 7), // JLH
    new Face3(7, 9, 2), // HJC
    new Face3(2, 7, 5), // CHF
    new Face3(5, 2, 8), // FCI
    new Face3(8, 5, 10), // IFK
    new Face3(10, 8, 4), // KIE
    new Face3(4, 10, 1), // EKB
  ];

  let radius = Math.sqrt(phi + 2);

  return { vertices, faces, radius };
};

export { tetrahedronShape, octahedronShape, icosahedronShape };
