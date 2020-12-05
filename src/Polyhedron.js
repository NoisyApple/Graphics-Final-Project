import {
  Vector3,
  Face3,
  Geometry,
  MeshPhongMaterial,
  Mesh,
  MeshNormalMaterial,
  DoubleSide,
} from "three";
import { normalizeRadius } from "./functions";

export default class Polyhedron {
  constructor() {
    this.geom = new Geometry();
    this.mat = new MeshPhongMaterial({
      color: 0x00ffff,
      wireframe: true,
    });

    this.geom.vertices.push(
      new Vector3(1, 1, 1), // A
      new Vector3(-1, 1, -1), // B
      new Vector3(-1, -1, 1), // C
      new Vector3(1, -1, -1) // D
    );

    this.geom.faces.push(
      new Face3(0, 3, 1),
      new Face3(1, 3, 2),
      new Face3(2, 3, 0),
      new Face3(0, 1, 2)
    );

    // this.geom.computeVertexNormals();
    this.geom.computeFaceNormals();

    this.mesh = new Mesh(
      this.geom,
      new MeshNormalMaterial({ side: DoubleSide })
    );
  }

  forwardMorph() {
    let newFaces = [];

    this.geom.faces.forEach((face) => {
      let a = this.geom.vertices[face.a].clone();
      let b = this.geom.vertices[face.b].clone();
      let c = this.geom.vertices[face.c].clone();

      let vIndex = this.geom.vertices.length - 1;

      let e = normalizeRadius(
        a.clone().add(b).clone().divide(new Vector3(2, 2, 2))
      ); // 1
      let f = normalizeRadius(
        b.clone().add(c).clone().divide(new Vector3(2, 2, 2))
      ); // 2
      let g = normalizeRadius(
        c.clone().add(a).clone().divide(new Vector3(2, 2, 2))
      ); // 3

      this.geom.vertices.push(e, f, g);

      newFaces.push(new Face3(face.a, vIndex + 1, vIndex + 3));
      newFaces.push(new Face3(face.b, vIndex + 1, vIndex + 2));
      newFaces.push(new Face3(face.c, vIndex + 2, vIndex + 3));
      newFaces.push(new Face3(vIndex + 1, vIndex + 1, vIndex + 3));
    });

    this.geom.faces = newFaces;

    console.log(this.geom.vertices);
    console.log(this.geom.faces);

    // this.geom.computeVertexNormals();
    this.geom.computeFaceNormals();

    this.geom.verticesNeedUpdate = true;
    this.geom.elementsNeedUpdate = true;
    this.geom.morphTargetsNeedUpdate = true;
    this.geom.uvsNeedUpdate = true;
    this.geom.normalsNeedUpdate = true;
    this.geom.colorsNeedUpdate = true;
    this.geom.tangentsNeedUpdate = true;
  }
}
