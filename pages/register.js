import Page from "components/Page";
import getJson from "utilities/getJson";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Register = () => {
  const [message, setMessage] = useState(null);
  const { errors, handleSubmit, register } = useForm();

  const onSubmit = async (form) => {
    try {
      const { email } = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(form),
      }).then(getJson);

      setMessage(`Created account ${email} :)`);
    } catch (e) {
      console.error(e);
      setMessage(`Couldn't create an account for ${email} :(`);
    }
  };

  return (
    <Page title="Register">
      <h2>Register</h2>

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

export default Register;
