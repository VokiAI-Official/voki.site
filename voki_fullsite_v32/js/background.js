import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

const canvas = document.getElementById('bgCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1);

const uniforms = {
  time: { value: 0.0 },
  resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
};

const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec2 resolution;
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution;
      float r = 0.5 + 0.5 * sin(time + uv.x * 10.0);
      float g = 0.5 + 0.5 * sin(time + uv.y * 12.0);
      float b = 0.5 + 0.5 * sin(time + (uv.x + uv.y) * 8.0);
      gl_FragColor = vec4(r, g * 0.2, b, 1.0);
    }
  `
});

const geometry = new THREE.PlaneBufferGeometry(2, 2);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Particles
const particles = new THREE.BufferGeometry();
const count = 2000;
const positions = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
  positions[i * 3] = (Math.random() * 2 - 1) * 1.5;
  positions[i * 3 + 1] = (Math.random() * 2 - 1) * 1.5;
  positions[i * 3 + 2] = 0;
}
particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const pMaterial = new THREE.PointsMaterial({
  size: 0.003,
  transparent: true,
  opacity: 0.4,
  color: 0x00ffff
});
const points = new THREE.Points(particles, pMaterial);
scene.add(points);

function animate(time) {
  uniforms.time.value = time * 0.001;
  points.rotation.z = time * 0.0001;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
});
