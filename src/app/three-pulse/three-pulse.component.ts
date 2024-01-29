import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vertexShader from './shaders/vertexShader';
import fragmentShader from './shaders/fragmentShader';

@Component({
  selector: 'app-three-pulse',
  templateUrl: './three-pulse.component.html',
  styleUrls: ['./three-pulse.component.scss'],
})
export class ThreePulseComponent implements OnInit, OnDestroy {
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
  private shaderMaterial!: THREE.ShaderMaterial;
  private cursor: { x: number; y: number } = { x: 0.0, y: 0.0 };

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.initScene();
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMove.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize.bind(this));
    window.removeEventListener('mousemove', this.onMove.bind(this));
    throw new Error('Method not implemented.');
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

    this.renderShaderBlock();

    this.ngZone.runOutsideAngular(() => this.animate());
  }

  private animate() {
    const elapsedTime = this.clock.getElapsedTime();

    requestAnimationFrame(() => this.animate());

    this.shaderMaterial.uniforms['time'].value = elapsedTime;

    this.controls.update();
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }

  renderShaderBlock() {
    const geometry = new THREE.PlaneGeometry(256, 256, 256, 256);

    const geometry1 = new THREE.PlaneGeometry(2, 2, 2, 2);

    const count = geometry.attributes['position'].count;
    const randoms = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      randoms[i] = Math.random();
    }

    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

    this.shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0.0 },
        uFrequency: { value: randoms },
        amplitude: { value: 0.2 },
        uCursor: {
          value: new THREE.Vector2(),
        },
      },
      wireframe: true,
    });

    const mesh = new THREE.Mesh(geometry, this.shaderMaterial);
    mesh.rotation.x = -Math.PI * 0.5;
    mesh.position.z = -25;
    mesh.position.y = -15;

    const mesh1 = new THREE.Mesh(geometry1, this.shaderMaterial);
    mesh1.rotation.x = -Math.PI * 0.5;

    this.scene.add(mesh);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMove(e: MouseEvent) {
    this.cursor = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };

    const value = {
      x: -(e.clientX / window.innerWidth - 0.5) * 1000,
      y: -(e.clientY / window.innerHeight - 0.5) * 1000,
    };

    this.shaderMaterial.uniforms['uCursor'].value = value;
    console.log(value);
  }
}
