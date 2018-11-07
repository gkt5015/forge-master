import React from 'react';
import { withFormik, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import ImageDrop from '../ImageDrop';
import ForgeCardSelect from './ForgeCardSelect';
import map from 'lodash/map';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        name: Yup.string().required('name is required!'),
        icon: Yup.string().required('Image required')
    }),
    mapPropsToValues: props => ({
        name: '',
        icon: '',
        requirements: []
    }),
    handleSubmit: (values, { setSubmitting, props, resetForm, setValues }) => {
        const payload = {
            ...values
        };

        props.handleAddSpecialCard(payload).then(() => {
            setSubmitting(false);
            resetForm({});
            setValues({ name: '' });
        });
    }
});

const AddSpecialCardForm = props => {
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
                        <label>1. Special Card Name</label>
                        <div className="form-input">
                            <input
                                placeholder="Enter special card name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name &&
                                touched.name && (
                                    <div
                                        style={{
                                            color: 'red',
                                            marginTop: '.5rem'
                                        }}
                                    >
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
                                <div
                                    style={{ color: 'red', marginTop: '.5rem' }}
                                >
                                    {errors.icon}
                                </div>
                            )}
                    </div>

                    <div className="special-card-requirements">
                        <label className="title">
                            3. Forge Card Requirements:
                        </label>
                        <FieldArray
                            name="requirements"
                            render={arrayHelpers => (
                                <div>
                                    {map(
                                        values.requirements,
                                        (requirement, index) => (
                                            <div
                                                key={index}
                                                className="form-requirement"
                                            >
                                                <ForgeCardSelect
                                                    name={`requirements.${index}.id`}
                                                    className="requirement-select"
                                                    value={requirement.id}
                                                    onChange={setFieldValue}
                                                    onBlur={setFieldTouched}
                                                    error={errors.topics}
                                                    touched={touched.topics}
                                                />
                                                <div className="form-field">
                                                    <label>Quantity:</label>
                                                    <Field
                                                        type="number"
                                                        className="form-counter"
                                                        name={`requirements.${index}.quantity`}
                                                    />
                                                </div>
                                                <div className="forge-card-req-action">
                                                    <button
                                                        type="button"
                                                        className="warn-btn"
                                                        onClick={() =>
                                                            arrayHelpers.remove(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        REMOVE REQUIREMENT
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    )}
                                    <div className="requirement-action">
                                        <button
                                            type="button"
                                            className="main-btn"
                                            onClick={() =>
                                                arrayHelpers.push({ id: '' })
                                            }
                                        >
                                            <FontAwesomeIcon icon={faPlus} />{' '}
                                            ADD REQUIREMENT
                                        </button>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className="main-area-right">
                    {!!values.icon && (
                        <div className="picture-area">
                            <div className="preview-area special-card-preview">
                                <img alt="preview" src={values.icon} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="action-area">
                <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                    CREATE SPECIAL CARD
                </button>
            </div>
        </form>
    );
};

export default formikEnhancer(AddSpecialCardForm);
