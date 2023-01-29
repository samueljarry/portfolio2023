import { shaderMaterial } from '@react-three/drei'
import {Vector2} from "three";

// This shader is from Bruno Simons Threejs-Journey: https://threejs-journey.xyz
const PlaneShader = shaderMaterial(
    {
        uScrollSpeed: 0.0,
        uTime: 0.0,
        uHoverState: 0.0,
        uHover: new Vector2(0.5, 0.5),
        uViewportSizes: new Vector2(window.innerWidth, window.innerHeight),

        uImage: undefined
    },
    `
        uniform float uTime;
        varying vec2 vUv;
 
        void main() {
          vUv = uv;
         
          vec3 p = position;
          p.z = (sin(p.x + uTime) * 0.2 + cos(p.y + uTime) * 0.2);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
    `,
    `
    uniform sampler2D uImage;

    varying vec2 vUv;
    
    void main()
    {
        gl_FragColor=texture2D(uImage,vUv);
    }
    `
)

const PlaneShaderMobile = shaderMaterial(
    {
        uScrollSpeed: 0.0,
        uTime: 0.0,
        uHoverState: 0.0,
        uHover: new Vector2(0.5, 0.5),
        uViewportSizes: new Vector2(window.innerWidth, window.innerHeight),

        uImage: undefined
    },
    `
        uniform float uTime;
        varying vec2 vUv;
 
        void main() {
          vUv = uv;
         
          vec3 p = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
    `,
    `
    uniform sampler2D uImage;

    varying vec2 vUv;
    
    void main()
    {
        gl_FragColor=texture2D(uImage,vUv);
    }
    `
)


export { PlaneShader, PlaneShaderMobile }
