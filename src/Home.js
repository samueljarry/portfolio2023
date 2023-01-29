import './styles/Home.scss'
import { Canvas, useThree } from "@react-three/fiber";
import Marquee from "./Marquee";
import HomeCanvas from "./HomeCanvas";
import {ScrollControls, Scroll, AdaptiveDpr} from "@react-three/drei";
import Gallery from "./Gallery";
import DesktopGallery from "./DesktopGallery";
import ProjectSpan from "./ProjectSpan";
import HomeAbout from "./HomeAbout";
import { Suspense } from "react";
import Loader from "./Loader";
import { motion } from "framer-motion";
import Preload from "./Preload";

const Home = ({ gpu }) =>
{
    let projectSpanHeight = (250) / window.innerHeight
    window.addEventListener('resize', () => projectSpanHeight = (250) / window.innerHeight)

    return <motion.main
        className="home"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
    >
        <Preload isHomePage />
        <section className="home_landing_section">
            <Suspense fallback={<Loader />}>
                <Canvas
                    className="landing_canvas"
                    gl={{ antialias: false }}
                    performance={{ min: 0.1 }}
                >
                    <AdaptiveDpr pixelated />
                    <ScrollControls
                        pages={
                            // Desktop
                            window.innerWidth > 1024
                                ? 2.25 + projectSpanHeight
                                // Responsive
                                : window.innerHeight < 800
                                    ? 6.7
                                    : window.innerHeight > 800
                                        ? 5.7
                                        : 2.25 + projectSpanHeight
                        }
                    >
                        <Scene gpu={ gpu } />
                    </ScrollControls>
                </Canvas>
            </Suspense>
        </section>
    </motion.main>
}

const Scene = ({ gpu }) =>
{
    let isSmallDevice
    let smallWidth = 1024
    const { width, height, factor } = useThree(state => state.viewport)
    width * factor > smallWidth ? isSmallDevice = false : isSmallDevice = true

    const props =
        {
            width,
            height,
            factor,
            isSmallDevice,
            gpu
        }

    return(
            <>
                <Scroll>
                    <HomeCanvas props={ props } />
                    {
                        isSmallDevice || gpu.isMobile
                        ? <Gallery props={ props } />
                        : <DesktopGallery props={props} />
                    }
                </Scroll>
                <Scroll html>
                    <Marquee />
                    <div className="corners_content">
                        <div className="corners_content_top">
                             <span className="name">
                                 Samuel <br />
                                 <span className="last_name">Jarry</span>
                            </span>
                            <span>
                                <span className="portfolio">Portfolio</span><br />
                                2023
                            </span>
                        </div>
                        <div className="corners_content_bottom">
                            <span>
                                Junior <span className="front">Front-End</span> &<br />
                                <span className="developer"><span className="webgl">WebGL</span> developer</span>
                            </span>
                        </div>
                    </div>
                    <HomeAbout />
                    <section className="responsive_projects">
                        <ProjectSpan isSmallDevice={isSmallDevice} />
                    </section>
                </Scroll>
            </>
        )
}

export default Home
