import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import ImageDrop from "../ImageDrop";
import { Field, FieldArray } from "formik";
import ForgeCardSelect from "./ForgeCardSelect";
import map from 'lodash/map'

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string().required("name is required!"),
    icon: Yup.string().required("Image required")
  }),
  mapPropsToValues: props => ({
    name: props.name,
    icon: props.icon,
    id: props.id,
    requirements: props.requirements
  }),
  enableReinitialize: true,
  handleSubmit: (values, { setSubmitting, props }) => {
    const payload = {
      ...values
    };
    props.handleEditSpecialCard(payload);
    setSubmitting(false);
  }
});

const EditSpecialCardForm = props => {
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
          <div className="card-name">
            <h4>Special Card Name:</h4>
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

          <div className="special-card-requirements">
            <h4>Forge Card Requirements:</h4>
            <FieldArray
              name="requirements"
              render={arrayHelpers => (
                <div>
                  {map(values.requirements, (requirement, index) => (
                    <div key={index}>
                      <ForgeCardSelect
                        name={`requirements.${index}.id`}
                        className="requirement-select"
                        value={requirement.id}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.topics}
                        touched={touched.topics}
                      />
                      <label>
                        How many?
                        <Field
                          type="number"
                          className="form-counter"
                          name={`requirements.${index}.quantity`}
                        />
                      </label>
                      <div className="forge-card-req-action">
                        <button
                          type="button"
                          className='warn-btn'
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          REMOVE REQUIREMENT
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="requirement-action">
                    <button
                      type="button"
                      className="main-btn"
                      onClick={() => arrayHelpers.push({ id: "" })}
                    >
                      Add Requirement
                    </button>
                  </div>
                </div>
              )}
            />
          </div>
        </div>

        <div className="main-area-right">
          <ImageDrop
            currentImage={currentImage}
            value={values.icon}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={errors.icon}
            touched={touched.icon}
            previewClassName='special-card-preview'
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
        <button type="button" className="warn-btn" onClick={handleCancelEdit}>
          CANCEL
        </button>
        <button type="submit" className="main-btn" disabled={isSubmitting}>
          SAVE EDITS
        </button>
      </div>
    </form>
  );
};

export default formikEnhancer(EditSpecialCardForm);
