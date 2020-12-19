import Page from "components/Page";
import getJson from "utilities/getJson";
import useRedirect from "hooks/useRedirect";
import { useForm } from "react-hook-form";
import { useState } from "react";

const AddFamily = () => {
  const [message, setMessage] = useState(null);
  const { errors, handleSubmit, register } = useForm();

  const onSubmit = async (form) => {
    try {
      await fetch("/api/families", {
        method: "POST",
        body: JSON.stringify(form),
      }).then(getJson);

      useRedirect("/families");
    } catch (e) {
      console.error(e);
      setMessage(`Couldn't create this family :(`);
    }
  };

  return (
    <Page title="Add a Family">
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
    </Page>
  );
};

export default AddFamily;
