import React from 'react';

const CustomInput = (props) => {
    return (
        <>
            <div className="form-group">
                <label htmlFor={props.content}>{(props.content)[0].toUpperCase() + (props.content).substring(1)}</label>
                <input type={props.type} id={props.content} name={props.content} placeholder={props.placeholder} />
            </div>
        </>
    )
}

export default CustomInput;