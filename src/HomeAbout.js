import {motion} from "framer-motion";
import {useFrame} from "@react-three/fiber";
import {useState} from "react";
import {useScroll} from "@react-three/drei";

const HomeAbout = () =>
{
    const [visible, setVisible] = useState(false)

    const data = useScroll()
    useFrame(() =>
    {
        if(data.visible(0.1/3.5, 3.5/7)) setVisible(true)
    })

    return (
        <motion.section
            className="about_wrapper"
            animate={{
                opacity: visible ? 1 : 0
            }}
        >
            <div className="about_strong">
                <strong>
                    Je suis un étudiant en 2ème année de BUT MMI, actuellement en recherche d'un stage
                    en développement Front-end cherchant à approfondir mon apprentissage de Javascript et idéalement
                    de React.
                </strong>
            </div>
            <div className="about_memoji">
                <img src="assets/memoji.png" alt="samuel's avatar" />
            </div>
        </motion.section>
    )
}

export default HomeAbout