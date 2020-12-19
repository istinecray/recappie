import Link from "next/link";
import Page from "components/Page";
import withAuth from "middleware/withAuth";
import { getFamilies } from "pages/api/families";

const Families = ({ families }) => {
  const getName = ({ name }) => name;

  const getFamilyRecipes = ({ _id, name, recipes }) => (
    <p key={_id}>
      <b>{name}</b> {recipes.data.map(getName).join(", ")}
    </p>
  );

  return (
    <Page title="Families">
      <h2>Families</h2>

      <ul>
        <li>
          <Link href="/families/add">
            <a>Add a Family</a>
          </Link>
        </li>
      </ul>

      <section>{families.map(getFamilyRecipes)}</section>
    </Page>
  );
};

export default Families;

export const getServerSideProps = withAuth(async () => {
  const families = await getFamilies();

  const props = {
    families,
  };

  return {
    props,
  };
});
