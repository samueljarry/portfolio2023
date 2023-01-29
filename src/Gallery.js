import projects from "./datas/projects.json";
import {TextureLoader} from "three";
import {PlaneShaderMobile} from "./PlaneShader";
import {extend} from "@react-three/fiber";
import {Text} from "@react-three/drei";
import {useControls, Leva} from "leva";
import {useNavigate} from "react-router-dom";
extend({PlaneShaderMobile})

const Gallery = ({ props }) =>
{
    const { height, width, factor } = props
    let current = height * factor < 800 ? -height * 0.3 : -height * 0.1

    const navigate = useNavigate()
    const textureLoader = new TextureLoader()

    const { textX, textY } = useControls({
        textX:
            {
                value: -0.5,
                min: -2,
                max: 4,
                step: 0.001
            },
        textY:
            {
                value: 0.57,
                min: 0,
                max: 4,
                step: 0.001
            }
    })

    return (
        <>
            <Leva hidden />
            {
                projects.map(({name, phoneCover}, index) =>
                {
                    if(index !== 0) height * factor < 800 ? current -= height * 0.7 : current -= height * 0.55
                    const texture = textureLoader.load(phoneCover)
                    return (
                        <mesh
                            key={ index }
                            scale={ width * 0.9 }
                            onPointerOver={() => document.documentElement.style.cursor = "pointer"}
                            onPointerLeave={() => document.documentElement.style.cursor = "default"}
                            onClick={() =>  navigate(`projects/${name.toLowerCase()}`)}
                            position={ [0, (2 * -height) + current, 0] }
                        >
                            <Text
                                font={'fonts/PPNeueMontreal-Medium.ttf'}
                                transform
                                color={'black'}
                                fontSize={ 0.1 }
                                anchorX={'left'}
                                position-x={ textX }
                                position-y={ textY }
                            >
                                {name}
                            </Text>
                            <Text
                                font={'fonts/PPNeueMontreal-Italic.ttf'}
                                transform
                                color={'black'}
                                fontSize={ 0.1 }
                                anchorX={'right'}
                                position-x={ -textX }
                                position-y={ -textY }
                                onPointerOver={() => document.documentElement.style.cursor = "pointer"}
                                onPointerLeave={() => document.documentElement.style.cursor = "default"}
                                onClick={() => navigate(`projects/${name.toLowerCase()}`)}
                            >
                                Voir le projet
                            </Text>
                            <planeGeometry />
                            <meshBasicMaterial key={PlaneShaderMobile.key} map={ texture } />
                        </mesh>
                    )
                })
            }
        </>
    )
}

export default Gallery