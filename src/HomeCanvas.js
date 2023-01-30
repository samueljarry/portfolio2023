import {Bloom, EffectComposer, Noise} from "@react-three/postprocessing";
import {BlendFunction} from "postprocessing";
import {Center, Environment} from "@react-three/drei";
import {Model} from "./Model";
import React, {useRef} from "react";
import gsap from "gsap";
import {horizontalLoop} from "./Utils";
import {useFrame} from "@react-three/fiber";

const Frame = ({ bloom, noise, smallDevice, mediumDevice }) =>
{
    const hasLanded = { value: false }

    const marqueeAnimation = () =>
    {
        const marqueeItems = gsap.utils.toArray('.marquee_item')
        const loop = horizontalLoop(marqueeItems, {paused: true});
        marqueeItems.forEach((marqueeItem, i) => loop.toIndex(i, { duration: 20, ease: "none", repeat: -1}))
    }

    useFrame(() =>
    {
        if(hasLanded.value) return

        else if (document.querySelector('.marquee_item span'))
        {
            if(!smallDevice && !mediumDevice)
            {
                gsap.timeline()
                    .set('.marquee_item span',
                        {
                            display: 'flex',
                            y: "100%",
                            opacity: 0,
                        })
                    .add(() => marqueeAnimation())
                    .to('.marquee_item span',
                        {
                            y:0,
                            stagger:
                                {
                                    amount: 2,
                                    ease: 'Sine.ease',
                                },
                            opacity: 1,
                            ease: 'Sine.ease',
                            duration: 0.7,
                            delay: 0.5
                        })
                    .to(bloom.current,
                        {
                            delay: 0.5,
                            intensity: 5,
                            duration : 0.9,
                            ease: 'Sine.ease'
                        },'<')
                    .to(noise.current,
                        {
                            premultiply: true
                        }, '<')

                hasLanded.value = true
            }
            else
            {
                gsap.timeline()
                    .set('.marquee_item span',
                        {
                            display: 'flex',
                            y: "100%",
                            opacity: 0,
                        })
                    .add(() => marqueeAnimation())
                    .to('.marquee_item span',
                        {
                            y: 0,
                            stagger:
                                {
                                    amount: 2,
                                    ease: 'Sine.ease',
                                },
                            opacity: 1,
                            ease: 'Sine.ease',
                            duration: 0.7
                        })

                hasLanded.value = true
            }
        }
        else return
    })
}

const HomeCanvas = ({ props }) =>
{
    const {height, width, isSmallDevice, isMediumDevice, gpu} = props
    const bloom = useRef()
    const noise = useRef()
    const group = useRef()

    return (
        <>
            <Frame bloom={ bloom } noise={ noise } smallDevice={ isSmallDevice } mediumDevice={ isMediumDevice } />
            {/* Uniquement si ordinateur avec plus de 30 fps */}
            { !isSmallDevice && !isMediumDevice && gpu.tier > 2 &&
            <>
                <EffectComposer
                    multisampling={ 0 }
                >
                    <Bloom
                        ref={ bloom }
                        luminanceThreshold={ 0.475 }
                        luminanceSmoothing={ 2.1 }
                        intensity={ 100 }
                    />
                    <Noise
                        blendFunction={ BlendFunction.SOFT_LIGHT }
                        ref={noise}
                    />
                </EffectComposer>
            </>
            }
            <Environment preset="warehouse" />

            <Center
                speed={ 1.5 }
            >
                <Model
                    group={ group }
                    props={ props }
                />
            </Center>
        </>

)
}

export default HomeCanvas