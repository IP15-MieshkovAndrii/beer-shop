import React from "react";
import HeroSection from "../components/HeroSection";

const About = () => {

    const data = {
        name: "ВИbeer вільних людей",
    }
    return (
        <>

            <HeroSection myData={data}/>
        </>
    )
}

export default About;