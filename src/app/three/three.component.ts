import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss'],
})
export class ThreeComponent implements OnInit {
  @ViewChild('sceneContainer', { static: true })
  private sceneContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private particlesGeometry!: THREE.BufferGeometry;
  private controls!: OrbitControls;
  private clock: THREE.Clock = new THREE.Clock();
  private textureLoader: THREE.TextureLoader = new THREE.TextureLoader(
    new THREE.LoadingManager()
  );

  ngOnInit() {
    this.initScene();
  }

  private initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.sceneContainer.nativeElement.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // this.cube = new THREE.Mesh(geometry, material);
    // this.scene.add(this.cube);

    this.renderParticles();

    this.animate();
  }

  private animate() {
    const elapsedTime = this.clock.getElapsedTime();

    requestAnimationFrame(() => this.animate());

    // this.cube.rotation.x += 0.001;
    // this.cube.rotation.y += 0.001;

    // this.particles.scale.set(
    //   2 + Math.sin(elapsedTime / 100),
    //   2 + Math.sin(elapsedTime / 2),
    //   1
    // );

    for (
      let i = 0;
      i < this.particlesGeometry.attributes['position'].array.length;
      i++
    ) {
      const i3 = i * 3;
      const x =
        this.particlesGeometry.attributes['position'].array[i3 + 0] +
        this.particlesGeometry.attributes['position'].array[i3 + 1];
      this.particlesGeometry.attributes['position'].array[i3 + 2] =
        1 +
        Math.tan(elapsedTime / 5 + x) * -1 +
        Math.sin(elapsedTime + x) * -1 +
        1 +
        Math.cos(elapsedTime / 5 + x);
    }
    this.particlesGeometry.attributes['position'].needsUpdate = true;

    this.controls.update();
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }

  renderParticles() {
    const texture = this.textureLoader.load('assets/particles/scorch_01.png');
    const texture_2 = this.textureLoader.load('assets/particles/star_08.png');

    this.particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial();
    particlesMaterial.size = 0.1;
    particlesMaterial.sizeAttenuation = true;
    particlesMaterial.transparent = true;
    particlesMaterial.alphaMap = texture;
    particlesMaterial.depthWrite = false;
    // particlesMaterial.color = new THREE.Color('white');

    this.particles = new THREE.Points(
      this.particlesGeometry,
      particlesMaterial
    );

    // const particlesGeometry = new THREE.BufferGeometry();
    const count = 1000;

    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 1;
    }

    // const particlesMaterial_2 = new THREE.PointsMaterial();
    // particlesMaterial_2.size = 0.1;
    // particlesMaterial_2.sizeAttenuation = true;
    // particlesMaterial_2.transparent = true;
    // particlesMaterial_2.alphaMap = texture_2;

    // particlesGeometry.setAttribute(
    //   'position',
    //   new THREE.BufferAttribute(positions, 3)
    // );

    this.particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    // const part = new THREE.Points(particlesGeometry, particlesMaterial_2);

    // particlesMaterial.blending = THREE.AdditiveBlending;
    // this.scene.add(part);
    this.scene.add(this.particles);
  }
}
