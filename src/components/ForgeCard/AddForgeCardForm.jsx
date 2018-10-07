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
  handleSubmit: (values, { setSubmitting, props, resetForm, setValues }) => {
    const payload = {
      ...values
    };

    props.handleAddForgeCard(payload).then(() => {
      setSubmitting(false);
      resetForm({});
      setValues({ name: ''})

    });
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
          <div className="form-field">
            <label>1. Forge Card Name</label>
            <div className="form-input">
              <input
                placeholder="Enter forge card name"
                name="name"
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
          <div className="form-field">
            <label>2. Upload Image</label>
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
        <div className="main-area-right">
          {!!values.icon && (
            <div className="picture-area">
              <div className="preview-area forge-card-preview">
                <img alt="preview" src={values.icon} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="action-area">
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          CREATE FORGE CARD
        </button>
      </div>
    </form>
  );
};

export default formikEnhancer(AddForgeCardForm);
