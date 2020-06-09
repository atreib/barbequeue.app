import React, { useState } from 'react'
import './patcher.css'

const PatcherComponent = (props) => {
    const { 
        propertyName, 
        propertyValue, 
        label, 
        type 
    } = props.properties
    const closePatcher = props.backCallback
    const confirmPatcher = props.confirmCallBack
    const [propValue, setPropValue] = useState((type === "number") ? Number(propertyValue) : propertyValue)

    const backButton = () => {
        closePatcher()
    }

    const confirmBtn = () => {
        const updatedInfo = {
            [propertyName]: (type === "number") ? Number(propValue.replace(",",".")) : propValue
        }
        confirmPatcher(updatedInfo)
    }

    return (
        <>
            <div className="patcher-wrapper">
                <div className="patcher-container">
                    <div className="options">
                        <span className="btn btn-danger" onClick={backButton}>
                            Cancelar
                        </span>
                    </div>
                    <div className="form-group mb-3 text-left">
                        <label htmlFor={propertyName}>{label}:</label>
                        <div className="input-group">
                            <input type={type}
                                    placeholder={label}
                                    className="form-control"
                                    label={label}
                                    value={propValue}
                                    onChange={(e) => {
                                        setPropValue(e.currentTarget.value)
                                    }}
                                    name={propertyName}
                                    margin="normal" />
                        </div>
                    </div>
                    <div className="text-right">
                        <button className="btn btn-dark btn-block" onClick={confirmBtn}>
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatcherComponent