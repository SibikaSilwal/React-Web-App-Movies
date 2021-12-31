import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import TextField from "../Forms/TextField";
import Button from "../Utils/Button";
import { actorCreationDTO } from "./actors.model";
import * as Yup from "yup";
import DateField from "../Forms/DateField";
import ImageField from "../Forms/ImageField";
import MarkdownField from "../Forms/MarkdownField";

export default function ActorForm(props: actorFormProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        name: Yup.string().required("Name is required").firstLetterUC(),
        dateOfBirth: Yup.date()
          .nullable()
          .required("Date of Birth is required."),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField displayName="Name" field="name" />
          <DateField displayName="Date of Birth" field="dateOfBirth" />
          <ImageField
            displayName="Image"
            field="picture"
            imageURL={props.model.pictureURL}
          />
          <MarkdownField displayName="Biography" field="biography" />
          <Button disabled={formikProps.isSubmitting} type="submit">
            Save Changes
          </Button>
          <Link to="/actors" className="btn btn-secondary">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface actorFormProps {
  model: actorCreationDTO;
  onSubmit(
    values: actorCreationDTO,
    action: FormikHelpers<actorCreationDTO>
  ): void;
}
