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
  constructor(shape) {
    this.shape = shape;

    this.geom = new Geometry();
    this.mat = new MeshPhongMaterial({
      color: 0x00ffff,
      wireframe: true,
    });

    this.geom.vertices = this.shape.vertices;

    this.geom.faces = this.shape.faces;

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
        a.clone().add(b).clone().divide(new Vector3(2, 2, 2)),
        this.shape.radius
      );
      let f = normalizeRadius(
        b.clone().add(c).clone().divide(new Vector3(2, 2, 2)),
        this.shape.radius
      );
      let g = normalizeRadius(
        c.clone().add(a).clone().divide(new Vector3(2, 2, 2)),
        this.shape.radius
      );

      this.geom.vertices.push(e, f, g);

      newFaces.push(new Face3(face.a, vIndex + 1, vIndex + 3));
      newFaces.push(new Face3(face.b, vIndex + 1, vIndex + 2));
      newFaces.push(new Face3(face.c, vIndex + 2, vIndex + 3));
      newFaces.push(new Face3(vIndex + 1, vIndex + 1, vIndex + 3));
    });

    this.geom.faces = newFaces;

    // this.geom.computeVertexNormals();
    this.geom.computeFaceNormals();
  }
}
