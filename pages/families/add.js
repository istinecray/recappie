import Footer from "components/Footer";
import Head from "next/head";
import Header from "components/Header";
import getJson from "utilities/getJson";
import styles from "styles/Home.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

const AddFamily = () => {
  const [message, setMessage] = useState(null);
  const { errors, handleSubmit, register } = useForm();

  const onSubmit = async (form) => {
    try {
      const { name } = await fetch("/api/families", {
        method: "POST",
        body: JSON.stringify(form),
      }).then(getJson);

      setMessage(`Created ${name} family :)`);
    } catch (e) {
      console.log(e);
      setMessage(`Couldn't create this family :(`);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Recappie | Add Family</title>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />

        <h2>Add a Family</h2>

        {message}

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <div>Family Name</div>

            <input
              name="name"
              ref={register({
                required: true,
              })}
              type="text"
            />

            {errors.name && <div>Family Name is a required field.</div>}
          </label>

          <button type="submit">Submit</button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default AddFamily;
