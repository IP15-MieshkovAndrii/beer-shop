import React from "react";
// import styled from "styled-components";
import FeatureProduct from "../components/FeatureProducts";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";


const Home = () => {
    const data = {
        name: "BИbeer",
    }
    return (
        <>
            <HeroSection myData={data}/>
            <FeatureProduct />
            <Services/>

        </>
    )
}



export default Home;