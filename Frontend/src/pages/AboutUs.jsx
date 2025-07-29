import React from 'react'
import Hero from '../components/Hero'
import BioGraphy from '../components/BioGraphy'

const AboutUs = () => {
    return (
        <>
            <Hero title={"Learn More About Us | AbhiCare Medical Institue"} imageURL={"/about.png"} />
            <BioGraphy imageURL={"/whoweare.png"} />
        </>
    )
}

export default AboutUs
