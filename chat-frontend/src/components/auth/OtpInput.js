import React, { useEffect, useRef } from "react";
import { TextField, Box } from "@mui/material";

const OTPInput = ({ register, setValue, errors }) => {
    const inputs = useRef([]);

    const focusNext = (index, event) => {
        if (index < 5 && event.target.value) {
            inputs.current[index + 1].focus();
        }
    };

    const focusPrev = (index, event) => {
        if (event.keyCode === 8 && index > 0 && !event.target.value) {
            inputs.current[index - 1].focus();
        }
    };

    useEffect(() => {
        register("otp");
    }, [register]);

    const handleChange = (index, event) => {
        focusNext(index, event);
        const otp = inputs.current.map((input) => input.value).join("");
        setValue("otp", otp);
    };

    return (
        <Box display="flex" justifyContent="center" gap={2}>
            {Array.from({ length: 6 }, (_, i) => i).map((i) => (
                <TextField
                    key={i}
                    inputRef={(ref) => (inputs.current[i] = ref)}
                    variant="outlined"
                    inputProps={{ maxLength: 1 }}
                    sx={{ width: "5ch" }}
                    onKeyDown={(event) => focusPrev(i, event)}
                    onChange={(event) => handleChange(i, event)}
                    error={Boolean(errors.otp)}
                    helperText={errors.otp?.message}
                />
            ))}
        </Box>
    );
};

export default OTPInput;