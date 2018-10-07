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
    name: props.name,
    icon: props.icon,
    id: props.id
  }),
  enableReinitialize: true,
  handleSubmit: (values, { setSubmitting, props }) => {
    const payload = {
      ...values
    };
    props.handleEditForgeCard(payload);
    setSubmitting(false);
  }
});

const EditForgeCardForm = props => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleCancelEdit,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
    currentImage
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
          SAVE EDITS
        </button>
        <button type="button" className="warn-btn" onClick={handleCancelEdit}>
          CANCEL
        </button>
      </div>
    </form>
  );
};

export default formikEnhancer(EditForgeCardForm);
