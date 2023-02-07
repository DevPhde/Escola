import React, { useState } from "react";

const Example = () => {
    const [values, setValues] = useState({
        input1: "",
        input2: "",
        input3: "",
        input4: ""
    });
    const [errors, setErrors] = useState({
        input1: "",
        input2: "",
        input3: "",
        input4: ""
    });

    const [enableCreate, setEnableCreate] = useState(false)
    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleCreate = () => {
        for (let index = 0; index < errors.length; index++) {
            const element = errors[index];
            console.log(element)
        }
        if (errors == "") {
            console.log("foi")

        }
    }

    const handleBlur = event => {
        if (!values[event.target.name]) {
            setErrors({
                ...errors,
                [event.target.name]: "Campo é obrigatório."
            });
            setEnableCreate(false)
        } else {
            setEnableCreate(true)
            setErrors({
                ...errors,
                [event.target.name]: ""
            });
        }
    };

    return (
        <div className="text-white">
            <div>
                <input
                    name="input1"
                    value={values.input1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.input1 && <p>{errors.input1}</p>}
            </div>

            <div>
                <input
                    name="input2"
                    value={values.input2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.input2 && <p>{errors.input2}</p>}
            </div>

            <div>
                <input
                    name="input3"
                    value={values.input3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.input3 && <p>{errors.input3}</p>}
            </div>

            <div>
                <input
                    name="input4"
                    value={values.input4}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.input4 && <p>{errors.input4}</p>}
            </div>
            <button onClick={handleCreate}> Cadastrar</button>
        </div>
    );
};

export default Example;
