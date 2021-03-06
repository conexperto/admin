import React, { useState, useRef, FormEvent } from "react";
import { makeStyles } from "@mui/styles";
import { Box, TextField } from "@mui/material";
import { useAuthContext } from "providers";
import { useFormData } from "hooks";
import { TextFieldPassword, ButtonLoading } from "components";

const useStyles = makeStyles(() => ({
  title: {},
  form: {
    "& > :not(style)": {
      mt: 1,
      mb: 1,
      width: "100%",
    },
  },
  whitespace: {
    height: "15px",
  },
}));

type Credentials = {
  email: string;
  password: string;
};
export function Login(): JSX.Element {
  const classes = useStyles();
  const { login } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { data, handleChange } = useFormData<Credentials>({
    email: "",
    password: "",
  });
  const submit = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { email, password } = data;
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  return (
    <>
      <h1 className={classes.title}>Iniciar Sesion</h1>
      <Box
        component="form"
        sx={{ "& > :not(style)": { mt: 1, mb: 1 } }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Correo Electronico"
          fullWidth
          variant="standard"
          onChange={handleChange("email")}
          required
        />
        <TextFieldPassword fullWidth onChange={handleChange} required />
        <div className={classes.whitespace}></div>
        <ButtonLoading submit={submit} state={loading} />
        <button hidden type="submit" ref={submit}></button>
      </Box>
    </>
  );
}
