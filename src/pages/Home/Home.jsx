import React from "react";
// import styled from "styled-components";
import HeroSection from "../../components/HeroSection";
import Services from "../../components/Services";


const Home = () => {
    const data = {
        name: "BИbeer",
    }
    return (
        <>
            <HeroSection myData={data}/>
            <Services/>

        </>
    )
}



export default Home;