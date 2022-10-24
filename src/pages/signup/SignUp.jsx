import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import { handleErrorAuth } from "../../utils";

import { TextField, Box, Button } from "@mui/material";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { createUser } = useAuth();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await createUser(email, password);
        navigate("/", { replace: true });
      } catch (error) {
        handleErrorAuth(error.code);
        console.log({
          error: error,
          errorcode: error.code,
        });
      }
    },
    [createUser, email, password]
  );

  return (
    <div>
      {/* SignUp
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type={"email"}
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type={"password"}
            placeholder="Password"
          />
          <input type={"submit"} value="Submit" />
        </form>
      </div> */}
      <Box
        height={"50vh"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
          <h1>Sign Up</h1>
          <TextField
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type={"email"}
            placeholder="Email"
          />
          <TextField
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type={"password"}
            placeholder="Password"
          />
          <Button
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#cc0000",
              marginTop: 2,
              ":hover": {
                bgcolor: "#ff0e0e",
                color: "white",
              },
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default SignUp;
