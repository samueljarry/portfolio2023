import {useLayoutEffect, useRef} from "react";

const Marquee = () =>
{
    // Voir Home.js pour l'animation
    const marquee = useRef()
    useLayoutEffect(() =>
    {
        // Placer le marquee derrière le modèle 3D (parent non accessible en SCSS car créé par le JS)
        const marqueeWrapper = marquee.current.parentNode.parentNode
        marqueeWrapper.style.zIndex = -1
    }, [])
    return (
        <div ref={marquee} className="header_marquee">
            <pre className="marquee_item">
                <span>S</span>
                <span>a</span>
                <span>m</span>
                <span>u</span>
                <span>e</span>
                <span>l </span>
                <span>J</span>
                <span>a</span>
                <span>r</span>
                <span>r</span>
                <span>y  </span>
                <span>|  </span>
            </pre>
            <pre className="marquee_item">
                <span>S</span>
                <span>a</span>
                <span>m</span>
                <span>u</span>
                <span>e</span>
                <span>l </span>
                <span>J</span>
                <span>a</span>
                <span>r</span>
                <span>r</span>
                <span>y  </span>
                <span>|  </span>
            </pre>
        </div>)
}

export default Marquee