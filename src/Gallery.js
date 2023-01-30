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
    const { height, width, factor, isMediumDevice } = props
    let current = (width*factor) > 720
                    ? -height * 0.5
                  : (width * factor) >= 650
                    ? -height * 0.9
                  : (width*factor) <= 720
                    ? -height * 0.89
                  : !isMediumDevice && height * factor < 800
                    ? -height * 0.3
                    : -height * 0.1
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
                    if(index !== 0) isMediumDevice && (width * factor) > 720
                                        ? current -= height * 0.8
                                    : (width * factor) <= 480 && (height * factor < 800)
                                        ? current -= height * 0.6
                                    : (width * factor) <= 720 && (width * factor) >= 650
                                        ? current -= height * 0.7
                                    : (width * factor) <= 720
                                        ? current -= height * 0.65
                                    : height * factor < 800 // Phones
                                        ? current -= height * 0.65
                                        : current -= height * 0.55

                    const texture = textureLoader.load(phoneCover)

                    return (
                        <mesh
                            key={ index }
                            scale={
                                (width * factor) > 1010
                                    ?  width * 0.5
                                : (width * factor) > 960
                                    ?  width * 0.53
                                : (width * factor) > 910
                                    ?  width * 0.57
                                : (width * factor) > 840
                                    ?  width * 0.6
                                : (width * factor) > 760
                                    ?  width * 0.65
                                : (width * factor) > 720
                                    ?  width * 0.7
                                : (width * factor) <= 480
                                    ? width * 0.9
                                :(width * factor) <= 570
                                    ? width * 0.75
                                : (width * factor) <= 720
                                    ? width * 0.68
                                    : width * 0.9
                            }
                            onPointerOver={() => document.documentElement.style.cursor = "pointer"}
                            onPointerLeave={() => document.documentElement.style.cursor = "default"}
                            onClick={() =>  navigate(`projects/${name.toLowerCase()}`)}
                            position={ [0, !isMediumDevice ? (2 * -height) + current : (1.3*-height) + current, 0] }
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