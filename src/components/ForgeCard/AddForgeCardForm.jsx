import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import ImageDrop from "../ImageDrop";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string().required("name is required!"),
    icon: Yup.string().required("Image required")
  }),
  mapPropsToValues: props => ({
    name: "",
    icon: ""
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const payload = {
      ...values
    };

    props.handleAddForgeCard(payload);
    setSubmitting(false);
  }
});

const AddForgeCardForm = props => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="main-form-area">
        <div className="main-area-left">
          <div className="card-name">
            <h4>Forge Card Name:</h4>

            <input
              id="name"
              placeholder="Enter forge card name"
              type="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {errors.name &&
              touched.name && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.name}
                </div>
              )}
          </div>
        </div>
        <div className="main-area-right">
          <ImageDrop
            value={values.icon}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={errors.icon}
            touched={touched.icon}
          />
          {errors.icon &&
            touched.icon && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.icon}
              </div>
            )}
        </div>
      </div>
      <div className="action-area">
        <button type="submit"  className='main-btn' disabled={isSubmitting}>
          CREATE FORGE CARD
        </button>
      </div>
    </form>
  );
};

export default formikEnhancer(AddForgeCardForm);
