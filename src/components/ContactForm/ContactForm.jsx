import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

const ContactForm = ({ onAdd }) => {
  const initialValues = {
    name: "",
    number: "",
    id: "",
  };

  const handleSubmit = (values, actions) => {
    onAdd({
      name: values.name,
      number: values.number,
      id: Date.now(),
    });
    actions.resetForm();
  };

  const onlyLetters = /^[A-Za-zА-Яа-яЄєІіЇїҐґ-\s]+$/;

  const phoneNumber = /^\d{3}-\d{2}-\d{2}$/;

  const applySchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required")
      .matches(onlyLetters, "Only letters"),
    number: Yup.string()
      .matches(phoneNumber, "The phone should be in this format 123-45-67")
      .required("Required"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={applySchema}
      >
        <Form className={css.form}>
          <label className={css.label}>
            Name
            <Field
              className={css.field}
              name="name"
              type="text"
              placeholder="John Smith"
            ></Field>
            <ErrorMessage className={css.error} name="name" component="span" />
          </label>
          <label className={css.label}>
            Number
            <Field
              className={css.field}
              name="number"
              type="phone"
              placeholder="123-45-67"
            ></Field>
            <ErrorMessage
              className={css.error}
              name="number"
              component="span"
            />
          </label>
          <button className={css.btn} type="submit">
            Add Contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default ContactForm;
