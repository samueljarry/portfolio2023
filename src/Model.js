import * as THREE from 'three'
import {MeshRefractionMaterial, useGLTF} from "@react-three/drei";
import {useFrame, useLoader, useThree} from "@react-three/fiber";
import {RGBELoader} from "three/addons/loaders/RGBELoader";
import {useRef} from "react";

const useLerpedMouse = () =>
{
    const mouse = useThree(state => state.mouse)
    const lerped = useRef(mouse.clone())
    const previous = new THREE.Vector2()

    useFrame(() =>
    {
        previous.copy(lerped.current)
        lerped.current.lerp(mouse, 0.1)
    })

    return lerped
}

export function Model({ props }) {

    const { isSmallDevice, isMediumDevice, gpu, width, height } = props
    const group = useRef()
    const mouse = useLerpedMouse()
    const { nodes } = useGLTF("models/logo.gltf");
    const texture = useLoader(RGBELoader, "assets/studio_small_08_1k.hdr")

    const ior =
        isSmallDevice
            ? 3
            : 1.8
    const fresnel =
        isSmallDevice
            ? 0.7
            : 0.7
    const scale =
        isSmallDevice
            ? width * 3.5
        : isMediumDevice
            ? height * 2.2
        : height * 3

    useFrame(() =>
    {
        group.current.rotation.y = (mouse.current.x * Math.PI) * 0.05
        group.current.rotation.x = (mouse.current.y * Math.PI) * 0.05
    })

    return (
        <group ref={ group } position={ [0,0,0] }>
            <mesh
                geometry={nodes.Curve.geometry}
                scale={ scale }
                rotation={[1.57, 0, 0]}
            >
                { isSmallDevice || isMediumDevice || gpu.tier < 2
                    ? <meshStandardMaterial color="gray" metalness={ 0.6 } roughness={ 0.17 } envMapIntensity={ 3.5 } />
                    : <MeshRefractionMaterial bounces={ 2 } ior={ ior } fresnel={ fresnel } envMap={ texture } />
                }
            </mesh>
            <mesh
                geometry={nodes.Curve001.geometry}
                scale={ scale }
                rotation={[1.57, 0, 0]}
            >
                { isSmallDevice || isMediumDevice || gpu.tier < 2
                    ? <meshStandardMaterial color="gray" metalness={ 0.6 } roughness={ 0.17 } envMapIntensity={ 3.5 } />
                    : <MeshRefractionMaterial bounces={ 2 } ior={ ior } fresnel={ fresnel } envMap={ texture } />
                }
            </mesh>
        </group>
    );
}

useGLTF.preload("models/logo.gltf");