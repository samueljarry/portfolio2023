import {motion} from "framer-motion";

const Preload = ({ isHomePage }) =>
{
    return (
        <motion.div>
            <PreloadDiv home={ isHomePage } zIndex={999} exitZ={997} index={0} />
            <PreloadDiv home={ isHomePage } zIndex={998} color={'orangered'} exitZ={998} index={1} />
            <PreloadDiv home={ isHomePage } zIndex={997} exitZ={999} index={2} />
        </motion.div>
    )
}

const PreloadDiv = ({ zIndex, exitZ, color, index, home }) =>
{
    const smallDevice = window.innerWidth < 1040
    const isSmallDevice = (small, large) => smallDevice ? small : large
    const additionalTime = home ? 0.1 * index : 0.2 * index
    const animationDelay = home ? 0.5 : 1.5
    const exitDelay = 0.1
    const defaultColor = '#F0F0F0'
    const initialProps =
        {
            width: '100vw',
            height: '100vh'
        }
    const animationProps =
        {
            width : isSmallDevice('100vw', '0vw'),
            height : isSmallDevice('0vh', '100vh')
        }
    const transitionProps =
        {
            ease : [0.37, 0, 0.63, 1],
            duration : 0.5
        }

    return (
        <motion.div
            className="preload"
            initial={{...initialProps, background: color ? color : defaultColor, zIndex}}
            animate={{...animationProps, zIndex, transition: {...transitionProps, delay: animationDelay + additionalTime}}}
            exit={{...initialProps, zIndex: exitZ, transition: {...transitionProps, delay:exitDelay + additionalTime}}}
        />
    )
}

export default Preload