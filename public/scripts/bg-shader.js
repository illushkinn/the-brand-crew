// bg-shader.js — Three.js animated background with Simplex Noise shader (ES module)
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

const canvas = document.getElementById('bg-canvas');
if (!canvas) throw new Error('bg-canvas not found');

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight, false);

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
// Simplex 3D noise — Ashima Arts
vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.06;

  // Base noise — large organic shapes
  float n1 = snoise(vec3(uv.x * 0.8, uv.y * 0.8, t));
  // Detail noise — finer grain
  float n2 = snoise(vec3(uv.x * 1.6, uv.y * 1.6, t * 1.3));
  float noise = n1 * 0.7 + n2 * 0.3;

  // Green forest tones
  vec3 baseColor    = vec3(0.078, 0.114, 0.106);
  vec3 highlight1   = vec3(0.122, 0.165, 0.141);
  vec3 highlight2   = vec3(0.098, 0.133, 0.118);

  float blend = smoothstep(-0.3, 0.3, noise);
  vec3 color = mix(baseColor, highlight1, blend);
  color = mix(color, highlight2, smoothstep(0.1, 0.5, noise) * 0.4);

  gl_FragColor = vec4(color, 0.4);
}
`;

const uniforms = {
  uTime: { value: 0 },
};

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms,
  transparent: true,
  depthWrite: false,
});

scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

// Fade in
canvas.style.opacity = '0';
canvas.style.transition = 'opacity 1.5s ease';
requestAnimationFrame(() => { canvas.style.opacity = '1'; });

const startTime = performance.now();

function render(time) {
  requestAnimationFrame(render);
  if (document.hidden) return;
  uniforms.uTime.value = prefersReduced ? 0 : (time - startTime) * 0.001;
  renderer.render(scene, camera);
}

requestAnimationFrame(render);

// Resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  }, 200);
}, { passive: true });
