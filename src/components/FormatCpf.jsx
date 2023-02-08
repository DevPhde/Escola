import React, { useState, useRef } from "react";
import { Form } from "react-router-dom";

function InputCpf() {
    const [formattedCpf, setFormattedCpf] = useState("");
    const cpfRef = useRef(null);

    const handleChange = (event) => {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/\D/g, ""); // remove todos os caracteres não numéricos

        if (inputValue.length <= 11) {
            let formattedValue = "";

            for (let i = 0; i < inputValue.length; i++) {
                if (i === 3 || i === 6) {
                    formattedValue += ".";
                }
                if (i === 9) {
                    formattedValue += "-";
                }
                formattedValue += inputValue[i];
            }

            setFormattedCpf(formattedValue);
            cpfRef.current.value = formattedValue;
        }
    };

    return (
            <Form.Control
            placeholder="000.000.000-00"
            type="text"
            ref={cpfRef}
            value={formattedCpf}
            onChange={handleChange}
            required
            >
            </Form.Control>

    );
}

export default InputCpf;
