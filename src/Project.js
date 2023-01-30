import projects from './datas/projects.json'
import './styles/Project.scss'
import { useNavigate, useParams } from "react-router-dom";
import {motion} from "framer-motion";
import Lenis from "@studio-freight/lenis";
import {useEffect, useState} from "react";
import gsap from 'gsap'
import Preload from "./Preload";

const Project = () =>
{
    const { name } = useParams()
    const navigate = useNavigate()

    const project = projects.find(project => project.name.toLowerCase() === name)

    const index = projects.findIndex(project => project.name.toLowerCase() === name)
    const { description, videos, images, url, techs, banner, phoneBanner } = project
    const projectName = project.name

    const [smallDevice, setSmallDevice] = useState(false)
    const [isHovered, hover] = useState(false)

    window.addEventListener('resize', () => window.innerWidth < 1024 ? setSmallDevice(true) : setSmallDevice(false))

    const lenis = new Lenis({
        duration: 2.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical', // vertical, horizontal
        gestureDirection: 'vertical', // vertical, horizontal, both
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    useEffect(() =>
    {
        let smallWidth = 1024
        window.innerWidth < smallWidth ? setSmallDevice(true) : setSmallDevice(false)
    }, [])

    return (
        <motion.main
            className={'projects_wrapper'}
            initial={{opacity: 0}}
            animate={{opacity: 1, transition:{delay:1}}}
        >
            <Preload />
            <motion.nav
                className="projects_nav"
                initial={{opacity: 0}}
                animate={{opacity: 1, transition:{ delay: 1.2}}}
            >
                <a href="/">samueljarry</a>
                <a className="linktree" href="https://linktr.ee/samueljry" target="_blank" rel="noreferrer"><img alt="logo linktree" src={'../../assets/linktree.svg'} /></a>
            </motion.nav>
            <motion.section className={'projects_header'}>
                    {
                        smallDevice

                        ?   <div className="projects_header_infos">
                                <div className="projects_header_infos_head">
                                    <h1>{ projectName }</h1>
                                    <strong>{description}</strong>
                                </div>
                                <span>Technologies : {techs.map((tech, index) => `${tech}${techs[index + 1] ? ',' : ''} `)}</span>
                            </div>

                        :   <div className="projects_header_infos">
                                <div className="projects_header_infos_heading">
                                    <h1>{ projectName }</h1>
                                </div>
                                <div className="projects_header_infos_list">
                                    <div className="description_container">
                                        <strong>{ description }</strong>
                                    </div>
                                    {
                                        url
                                        ?   <div className="link_container">
                                                <a href={url} target="_blank" rel="noreferrer">Visiter →</a>
                                            </div>
                                        :   <div className="link_container" />
                                    }
                                    <div className="tech_container">
                                        <span>Techs: {techs.map((tech, index) => `${tech}${techs[index + 1] ? ',' : ''} `)}</span>
                                    </div>
                                </div>
                            </div>
                    }
            </motion.section>
            <div
                className="projects_cover lazyload"
                style={{
                    backgroundImage: `url(../../projects/${smallDevice ? phoneBanner : banner})`
            }}
            >
            </div>
            <div className="projects_gallery">
                {
                    videos.map((video, index) =>
                    {
                        return <video key={ index } src={ `../../projects/${video}` } controls={window.innerWidth < 1024} autoPlay={window.innerWidth > 1024} loop muted={ true } />
                    })
                }
                {
                    images.map((image, index) =>
                    {
                        return <img key={ index } className={image.includes('responsive') ? 'responsive lazyload' : 'lazyload'} src={`../../projects/${image}`} alt={`${projectName}`} />
                    })
                }
            </div>
            {
                projects[index + 1]
                ?   <div
                        className="next_project"
                        onPointerOver={() =>
                        {
                            hover(true)
                            document.documentElement.style.cursor = 'pointer'
                        }}
                        onPointerLeave={() =>
                        {
                            hover(false)
                            document.documentElement.style.cursor = 'default'
                        }}
                        onClick={() =>
                        {
                            gsap.delayedCall(0.6, () =>
                            {
                                lenis.scrollTo(0)
                            })
                            gsap.delayedCall(1, () => lenis.destroy())
                            navigate(`/projects/${projects[index + 1].name.toLowerCase()}`)
                        }}
                    >
                        <span className="next_project_span">
                            Next <span>Project</span>
                        </span>
                        <div className="next_project_name">
                            <p>{projects[index + 1].name}</p>
                        </div>
                        <motion.div
                            animate={{
                                transform: isHovered && !smallDevice ? 'rotate(0deg)' : 'rotate(-10deg)',
                                top: isHovered && smallDevice
                                    ? 0
                                    : isHovered && !smallDevice
                                    ? -120
                                    : 0,
                                transition: {bounce: false, ease: [0.87, 0, 0.13, 1]}

                            }}
                            className="next_project_cover lazyload"
                            style={{backgroundImage: `url(../../${projects[index + 1].cover})`}}
                        />
                    </div>

                : <div />
            }
        </motion.main>
    )
}

export default Project