import Footer from "components/Footer";
import Head from "next/head";
import Header from "components/Header";
import getJson from "utilities/getJson";
import styles from "styles/Home.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Login() {
  const [message, setMessage] = useState(null);
  const { errors, handleSubmit, register } = useForm();

  const onSubmit = async (form) => {
    const error = "Couldn't log in :(";

    try {
      const success = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify(form),
      }).then(getJson);

      setMessage(success ? "Logged in :)" : error);
    } catch (e) {
      console.log(e);
      setMessage(error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Recappie | Login</title>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />

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
      </main>

      <Footer />
    </div>
  );
}
