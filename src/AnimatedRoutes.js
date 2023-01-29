import {Route, Routes, useLocation} from "react-router-dom";
import Home from "./Home";
import Project from "./Project";
import {useDetectGPU} from "@react-three/drei";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () =>
{
    const location = useLocation()
    const {isMobile, tier} = useDetectGPU()
    return (
        <AnimatePresence>
            <Routes location={ location } key={location.pathname}>
                <Route
                    path="/"
                    element={<Home gpu={ {isMobile, tier } }/>}
                />

                <Route
                    path="projects/:name"
                    element={<Project />}
                />

                <Route
                    path="*"
                    element={<Home gpu={ {isMobile, tier } } />}
                />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes