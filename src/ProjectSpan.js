import {motion} from "framer-motion";
import {useState} from "react";
import {useScroll} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";

const ProjectSpan = ({ isSmallDevice }) =>
{
    const [visible, setVisible] = useState(false)
    const data = useScroll()

    useFrame(() =>
    {
        let areProjectsVisible = isSmallDevice ? data.visible(2/7, 1.5/7) : data.visible((1.75) / 2.25, 1.7 / 2.25)
        areProjectsVisible
            ? setVisible(true)
            : setVisible(false)
    })

    return (
        <div className="projects_heading">
            <motion.strong
                animate={{
                    paddingRight: visible && isSmallDevice
                                ? '20%'
                                : visible && !isSmallDevice
                                ? '10%'
                                : 0,
                    transition: {bounce: false, ease: [0.87, 0, 0.13, 1]}
                }}
                className="projects_strong">Selected <br />
            </motion.strong>
            <motion.strong
                animate={{
                    paddingLeft: visible && isSmallDevice
                                ? '20%'
                                : visible && !isSmallDevice
                                ? '10%'
                                : 0,
                    transition: {bounce: false, ease: [0.87, 0, 0.13, 1]}
                }}
            >
                Projects
            </motion.strong>
        </div>
    )
}

export default ProjectSpan