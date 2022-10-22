import { useContext, useState, useEffect } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LoggedInContext, ProfileContext, UserContext } from "../App";
import { styled } from "@mui/material/styles";
const Input = styled("input")({
  display: "none",
});

export default function Signup() {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [user, setUser] = useContext(UserContext);
  const [profile, setProfile] = useContext(ProfileContext);
  const [cpasserror, setcpasserror] = useState(true);
  const [emailerror, setemailerror] = useState(true);
  const [passerror, setpasserror] = useState(true);
  const [emp_id1, setemp_id1] = useState("");
  const history = useHistory();
  // console.log({ inputs });
  // if (inputs === undefined) {
  //   inputs = {};
  // }
  // const [Url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    cpassword: "",
    email: "",
    password: "",
    name: "",
    age: "",
    lastSchool: "",
    lastQualification: "",
    type: "",
    Url: "",
  });
  console.log({ inputs });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleEmailChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    const validRegex =
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])";
    if (value.match(validRegex)) {
      setemailerror(false);
    } else {
      setemailerror(true);
    }
  };
  const handlePasswordChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    if (inputs.password.length >= 8) {
      setpasserror(false);
    } else {
      setpasserror(true);
    }
  };
  const handleCPasswordChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    if (inputs.cpassword !== inputs.password) {
      setcpasserror(true);
    } else {
      setcpasserror(false);
    }
  };

  console.log(inputs);
  useEffect(() => {
    if (inputs.Url.length !== 0) {
      console.log(inputs);
      Axios.post("http://localhost:3001/register", inputs)
        .then((res) => {
          console.log("success");
          setemp_id1(res.data.insertId);
        })
        .catch((err) => {
          setError(err.Error);
          console.log("This is error", err);
        });
    }
  }, [inputs]);
  useEffect(() => {
    if (emp_id1) {
      setLoggedIn(true);

      setUser("employee");
      const Image = inputs.Url;
      const { Url, ...newvar } = inputs;
      setProfile({ ...newvar, emp_id: emp_id1, Image: Url });
      // setProfile(inputs);
      console.log(profile);
      history.push("/portal");
      setInputs({
        email: "",
        password: "",
        name: "",
        age: "",
        lastSchool: "",
        lastQualification: "",
        type: "",
        Url: "",
      });
      setemp_id1("");
    }
  }, [emp_id1]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (passerror || cpasserror || emailerror) return;

    console.log("inputs", inputs);
    let url;
    var formData = new FormData();
    var imagefile = document.querySelector("#file1");
    formData.append("image", imagefile.files[0]);

    Axios.post("http://localhost:3001/profile-upload-single", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        //  url = res.data.url;
        // setUrl(res.data.url);
        setInputs((prevState) => {
          return {
            ...prevState,
            Url: res.data.url,
          };
        });
        console.log(res.data.url);
        // console.log(data.url);
      })
      .catch((err) => {
        console.log({ err });
      });
    // setInputs({});
    // console.log({ inputs });

    // setError("");
    // console.log(inputs.type);
    // addUser();
    // history.push("/portal");
    var formData = new FormData();
    var imagefile = document.querySelector("#file1");
    // formData.append("image", imagefile.files[0]);
    // formData.append("image", imagefile.files[0]);
    formData.append("input", JSON.stringifyinputs);

    Axios.post("http://localhost:3000/profile-upload-single", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        const data = res.data;
        console.log(data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  if (loggedIn) {
    return <div>Already logged in ..</div>;
  }
  return (
    <Box
      // component="form"
      sx={{
        "& .MuiTextField-root": { width: "100%", paddingBottom: "1rem" },
        m: "auto",
        width: "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      // noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <TextField
          required
          id="outlined-required"
          label="Email"
          error={emailerror}
          helperText={emailerror ? "Enter valid email" : ""}
          value={inputs.email || ""}
          onChange={handleEmailChange}
          name="email"
        />
        <br />

        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          // autoComplete="current-password"
          value={inputs.password || ""}
          onChange={handlePasswordChange}
          error={passerror}
          helperText={
            passerror ? "Password should have length of at least 8" : ""
          }
          name="password"
        />
        <br />
        <TextField
          required
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          value={inputs.cpassword || ""}
          onChange={handleCPasswordChange}
          error={cpasserror}
          helperText={cpasserror ? "Please type same password to confirm." : ""}
          name="cpassword"
        />
        <br />
        <TextField
          required
          id="outlined-required"
          label="Name"
          value={inputs.name || ""}
          onChange={handleChange}
          name="name"
        />
        <br />
        <TextField
          required
          type="number"
          id="outlined-required"
          label="Age"
          value={inputs.age || ""}
          onChange={handleChange}
          name="age"
        />
      </div>
      {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={inputs.type}
          label="User Type"
          name="type"
          onChange={handleChange}
        >
          <MenuItem value={"employer"}>Employer</MenuItem>
          <MenuItem value={"employee"}>Employee</MenuItem>
        </Select>
      </FormControl> */}
      <br />
      <TextField
        required
        id="outlined-required"
        label="Last School"
        value={inputs.lastSchool || ""}
        onChange={handleChange}
        name="lastSchool"
      />
      <TextField
        required
        id="outlined-required"
        label="Last Qualification"
        value={inputs.lastQualification || ""}
        onChange={handleChange}
        name="lastQualification"
      />
      {/* <<<<<<< HEAD
      <form
        method="POST"
        action="#"
        onSubmit={() => {
          var formData = new FormData();
          var imagefile = document.querySelector("#file1");
          formData.append("image", imagefile.files[0]);
          Axios.post("http://localhost:3000/profile-upload-single", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then((res) => {
              const data = res.data;
              console.log(data.url);
            })
            .catch((err) => {
              console.log({ err });
            });
        }}
        // encType="multipart/form-data"
      >
        <div>
          <label>Upload profile picture</label>
          <input id="file1" type="file" name="image" required />
        </div>
        <div>
          <input type="submit" value="Upload" />
        </div>
      </form>
======= */}

      <div>
        <label>Upload profile picture</label>
        <input id="file1" type="file" name="image" required />
      </div>

      {/* >>>>>>> 6b405961559f32f413eaca362ec50bd3be401b5e */}

      <Button
        style={{ marginTop: "3rem" }}
        variant="contained"
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
      <p>{error}</p>
    </Box>
  );
}
