import React from 'react'

const Hero = ({ title, imageURL }) => {
    return (
        <div className='hero container'>
            <div className="banner">
                <h1>{title}</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error maiores possimus in sapiente porro obcaecati sint nam qui pariatur maxime, aut fugit eaque magni distinctio laborum, corrupti vitae doloribus odit. Consequuntur laboriosam aspernatur, distinctio quam exercitationem facere obcaecati nihil impedit qui tempore omnis iste veniam autem laborum ipsum, nisi libero.
                </p>
            </div>
            <div className="banner">
                <img src={imageURL} alt="hero" className='animated-image' />
                <span>
                    <img src="/Vector.png" alt="vector" />
                </span>
            </div>
        </div>
    )
}

export default Hero
