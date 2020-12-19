import Page from "components/Page";
import UserContext from "contexts/user";
import getText from "utilities/getText";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { login } = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const { errors, handleSubmit, register } = useForm();

  const onSubmit = async (form) => {
    const error = "Couldn't log in :(";

    try {
      const jwt = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(form),
      }).then(getText);

      if (jwt) login(jwt);
      setMessage(jwt ? "Logged in :)" : error);
    } catch (e) {
      console.error(e);
      setMessage(error);
    }
  };

  return (
    <Page title="Login">
      <h2>Login</h2>

      {message}

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <div>Email</div>

          <input
            name="email"
            ref={register({
              required: true,
            })}
            type="text"
          />

          {errors.email && <div>Email is a required field.</div>}
        </label>

        <label>
          <div>Password</div>

          <input
            name="password"
            ref={register({
              required: true,
            })}
            type="password"
          />

          {errors.password && <div>Password is a required field.</div>}
        </label>

        <button type="submit">Submit</button>
      </form>
    </Page>
  );
};

export default Login;
