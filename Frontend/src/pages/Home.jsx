import React, { useContext } from 'react'
import Hero from '../components/Hero'
import BioGraphy from '../components/BioGraphy'
import Department from '../components/Department'
import MessageForm from '../components/MessageForm'


const Home = () => {

    return (
        <>

            <Hero title={`Welcome to AbhiCare Medical Institute | Your Trusted Healthcare Provider.`} imageURL={'/hero.png'} />
            <BioGraphy imageURL={'/about.png'} />
            <Department />
            <MessageForm />


        </>
    )
}

export default Home
