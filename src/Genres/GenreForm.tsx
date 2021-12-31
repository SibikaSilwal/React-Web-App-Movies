import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Link, useHistory } from "react-router-dom";
import Button from "../Utils/Button";
import * as Yup from "yup";
import TextField from "../Forms/TextField";
import { genreCreationDTO } from "./genres.model";

export default function GenreForm(props: genreFormProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        name: Yup.string().required("Name is requied.").firstLetterUC(),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField field="name" displayName="Name" />

          <Button disabled={formikProps.isSubmitting} type="submit">
            Save Changes
          </Button>
          <Link className="btn btn-secondary" to="/genres">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface genreFormProps {
  model: genreCreationDTO;
  onSubmit(
    values: genreCreationDTO,
    action: FormikHelpers<genreCreationDTO>
  ): void;
}
