import React from "react";
import Select from "react-select";
import { createForgeCardOptions } from "../../utilities/createForgeCardOptions";
import mobx from "mobx";
import { observer, inject } from "mobx-react";
class ForgeCardSelect extends React.Component {
  handleChange = card => {
    // this is going to call setFieldValue and manually update values.topcis
    console.log("changing with value", card);
    this.props.onChange(this.props.name, card.value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { store, value, name, className } = this.props;
    const forgeCards = store.forgeCards;

    const forgeCardOptions = createForgeCardOptions(forgeCards);
    return (
      <div style={{ margin: "1rem 0" }} className='form-field'>
        <label>Forge Card </label>
        <Select
          name={name}
          className={"select-container form-input " + className}
          classNamePrefix={"select-container"}
          value={
            forgeCardOptions
              ? forgeCardOptions.find(option => option.value === value)
              : ""
          }
          options={forgeCardOptions}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {!!this.props.error &&
          this.props.touched && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {this.props.error}
            </div>
          )}
      </div>
    );
  }
}

export default inject("store")(observer(ForgeCardSelect));
