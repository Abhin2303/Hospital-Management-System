import React from 'react'

const BioGraphy = ({ imageURL }) => {
    return (
        <div className='container biography'>
            <div className="banner">
                <img src={imageURL} alt="AboutImg" />
            </div>
            <div className="banner">
                <p>Biography</p>
                <h3>Who we Are</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel animi rem laudantium porro facilis quia optio a voluptatem doloribus aliquam quos dicta repellat fugiat dolorum, aut dolores cumque quam cupiditate minus assumenda sapiente esse delectus? Vero velit provident quasi natus distinctio odit quidem ut suscipit ab, numquam modi. Sequi, corrupti!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur culpa aspernatur error voluptas. Voluptate, possimus! Quod fugit quisquam soluta dolore.</p>
            </div>
        </div>
    )
}

export default BioGraphy
