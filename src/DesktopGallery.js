import {Leva} from "leva";
import projects from "./datas/projects.json";
import {TextureLoader, Vector2} from "three";
import {PlaneShader} from "./PlaneShader";
import normalizeWheel from "normalize-wheel-es";
import {extend, useFrame} from "@react-three/fiber";
import {useRef} from "react";
import { lerp } from "three/src/math/MathUtils";
import {Text, useScroll} from "@react-three/drei";
import { debounce } from "lodash";
import {useNavigate} from "react-router-dom";

extend({PlaneShader})

const DesktopGallery = ({ props }) =>
{
    const navigate = useNavigate()
    const meshRefs = useRef([])
    let { width, height } = props
    const textureLoader = new TextureLoader()
    const meshWidth =  ((width * 4 ) / height)
    const meshTotalWidth = meshWidth + 0.5
    const galleryWidth = projects.length * meshTotalWidth
    let isScrollable = false
    let isDragged = false
    const scrollData = useScroll()
    let isDown
    let start
    let distance
    let direction
    let y = 0

    const scroll =
    {
        ease: 0.05,
        current: 0,
        target: 0,
        last: 0,
    }


    window.addEventListener('mousedown', (event) =>
    {
        isDown = true
        scroll.position = scroll.current
        start = event.clientX
    })

    window.addEventListener('mousemove', (event) =>
    {
        if(!isDown) return

        isDragged = true
        const x = event.clientX
        distance = (start - x) * 0.01

        scroll.target = scroll.position + distance
    })

    window.addEventListener('mouseup', () =>
    {
        isDown = false

        // Éviter que l'utilisateur soit rédirigé sur le projet alors qu'il est simplement en train de drag
        setTimeout(() => isDragged = false, 100)
        onCheck()
    })

    window.addEventListener('wheel', (event) =>
    {
        if(isScrollable)
        {
            const normalized = normalizeWheel(event)
            const speed = Math.abs(normalized.pixelY) > Math.abs(normalized.pixelX) ?  normalized.pixelY :  normalized.pixelX

            scroll.target += speed * 0.0075
            onCheckDebounce()
        }
    })

    // Snap to next item
    const onCheck = () =>
    {
        const width = meshTotalWidth
        const itemIndex = Math.round(Math.abs(scroll.target) / width)
        const item = width * itemIndex
        scroll.target < 0 ? scroll.target = -item : scroll.target = item
    }

    const onCheckDebounce = debounce(onCheck, 150)

    useFrame(() =>
    {
        scroll.current = lerp(scroll.current, scroll.target, scroll.ease)
        scroll.current > scroll.last ? direction = 'right' : direction = 'left'
        meshRefs.current.forEach((mesh, index) =>
        {
            mesh.position.x = (meshTotalWidth * index) - (scroll.current) - mesh.userData.extra
            const planeOffset = mesh.scale.x / 2
            const viewPortOffset = width
            let isBefore = mesh.position.x + planeOffset < -viewPortOffset
            let isAfter = mesh.position.x - planeOffset > viewPortOffset

            // Infinite Scroll
            if(direction === 'right' && isBefore)
            {
                mesh.userData.extra -= galleryWidth

                isBefore = false
                isAfter = false
            }

            if(direction === 'left' && isAfter)
            {
                mesh.userData.extra += galleryWidth

                isBefore = false
                isAfter = false
            }

            // Rotation
            mesh.rotation.z = map(mesh.position.x, -galleryWidth, galleryWidth, Math.PI, -Math.PI)
            mesh.position.y = Math.cos((mesh.position.x / galleryWidth) * Math.PI) * 15 - 15

            // Shader
            mesh.material.uniforms.uTime.value += 0.01

            // Animations

            scrollData.visible(2.24/2.25, 0.1/2.25) ? isScrollable = true : isScrollable = false
        })

        scroll.last = scroll.current
    })

    return (
        <group
            position-y={1.6 * -height + y}
        >
            <Leva hidden />
            {
                projects.map(({name, directory }, index) =>
                {
                    const texture = textureLoader.load(`projects/${directory}/cover.png`)
                    return (
                        <mesh
                            key={ index }
                            ref={(i) => {
                                if (!meshRefs.current[index]) meshRefs.current.push(i)
                            }}
                            scale-x={  (width * 8) / width / 2 }
                            scale-y={    (height * 6) / height / 2}
                            userData={{extra: 0}}
                            onPointerOver={() => document.documentElement.style.cursor = "pointer"}
                            onPointerLeave={() => document.documentElement.style.cursor = "default"}
                            onClick={() => !isDragged && navigate(`projects/${name.toLowerCase()}`)}
                        >
                            <planeGeometry args={[1,1, 32, 32]}/>
                            <planeShader
                                uViewPortSizes={new Vector2(width, height)}
                                uPlaneSizes={new Vector2((width * 4 ) / height, (height * 3) / width)}
                                uImage={texture}
                            />
                            <Text
                                font={'fonts/Redaction20-Italic.ttf'}
                                anchorX={'center'}
                                position-z={ 0.5 }
                                position-y={ -0.55 }
                                color={'black'}
                            >
                                {name}
                            </Text>
                        </mesh>
                    )
                })
            }
        </group>
    )
}

const map = (num, min1, max1, min2, max2, round = false) =>
{
    const num1 = (num - min1) / (max1 - min1)
    const num2 = (num1 * (max2 - min2)) + min2

    if (round) return Math.round(num2)

    return num2
}

export default DesktopGallery