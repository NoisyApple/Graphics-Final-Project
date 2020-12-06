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
    this.centralFace = false;

    this.actualMorph = 0;
    this.morphs = [{ vertices: this.shape.vertices, faces: this.shape.faces }];

    this.geom = new Geometry();
    this.mat = new MeshNormalMaterial({ side: DoubleSide });

    this.update();

    this.mesh = new Mesh(this.geom, this.mat);
  }

  forwardMorph() {
    if (
      this.morphs[this.actualMorph + 1] === undefined &&
      this.actualMorph + 1 < 7
    ) {
      let newVertices = [...this.morphs[this.actualMorph].vertices];
      let newFaces = [];

      this.geom.faces.forEach((face) => {
        let a = newVertices[face.a].clone();
        let b = newVertices[face.b].clone();
        let c = newVertices[face.c].clone();

        let vIndex = newVertices.length - 1;

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

        newVertices.push(e, f, g);

        newFaces.push(new Face3(face.a, vIndex + 1, vIndex + 3));
        newFaces.push(new Face3(face.b, vIndex + 1, vIndex + 2));
        newFaces.push(new Face3(face.c, vIndex + 2, vIndex + 3));
        if (this.centralFace)
          newFaces.push(new Face3(vIndex + 1, vIndex + 2, vIndex + 3));
      });

      this.morphs.push({ vertices: newVertices, faces: newFaces });
    }

    if (this.actualMorph + 1 < 7) {
      this.actualMorph += 1;
      this.update();
    }
  }

  backwardMorph() {
    if (this.morphs[this.actualMorph - 1] !== undefined) {
      this.actualMorph -= 1;
      this.update();
    }
  }

  update() {
    this.geom.vertices = this.morphs[this.actualMorph].vertices;
    this.geom.faces = this.morphs[this.actualMorph].faces;

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

  applyShape(shape) {
    this.shape = shape;

    this.actualMorph = 0;
    this.morphs = [{ vertices: this.shape.vertices, faces: this.shape.faces }];
    this.update();
  }

  useCentralFace(state) {
    this.centralFace = state;
    this.applyShape(this.shape);
  }
}
