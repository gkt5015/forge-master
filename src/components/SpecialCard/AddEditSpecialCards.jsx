import React from "react";
import AddSpecialCardForm from "./AddSpecialCardForm";
import EditSpecialCardForm from "./EditSpecialCardForm";
import Select from "react-select";
import { createSpecialCardOptions } from "../../utilities/createSpecialCardOptions";
import merge from "lodash/merge";
import addSpecialCard from "../../api/addSpecialCard";
import editSpecialCard from "../../api/editSpecialCard";
import get from "lodash/get";
import keys from "lodash/keys";
import { observer, inject } from "mobx-react";
import mobx from "mobx";

class AddEditSpecialCards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      selectedOption: "",
      selectedCardId: ""
    };
  }

  handleCancelEdit = () => {
    this.setState({
      isEditing: false,
      selectedOption: ""
    });
  };

  handleSelectCard = selectedOption => {
    const { value } = selectedOption;
    this.setState({
      selectedCardId: value,
      selectedOption,
      isEditing: true
    });
  };

  handleAddSpecialCard = specialCard => {
    const { specialCards } = this.state;
    const specialCardCount = get(keys(specialCards), "length", 0);
    const newId = specialCardCount + 1;
    const { name, icon, requirements } = specialCard;
    const newSpecialCard = { [newId]: { name, icon, requirements } };
    const newSpecialCards = merge({}, specialCards, newSpecialCard);

    this.setState({
      specialCards: newSpecialCards
    });

    return addSpecialCard({ name, icon, requirements }).then(() => {
      alert(`Added special card ${name}`);
    });
  };

  handleEditSpecialCard = specialCard => {
    const { specialCards } = this.state;
    const { id, name, icon, requirements } = specialCard;
    const editedSpecialCard = { [id]: { name, icon, requirements } };

    const editedSpecialCards = merge({}, specialCards, editedSpecialCard);

    this.setState({
      specialCards: editedSpecialCards,
      selectedOption: '',
    });

    return editSpecialCard({ id, name, icon, requirements }).then(() => {
      alert(`Edited special card ${name}`);
      this.setState({
        isEditing: false
      })
    });
  };

  render() {
    const { store } = this.props;
    const specialCards = mobx.toJS(store.specialCards);

    const { isEditing, selectedOption, selectedCardId } = this.state;
    const specialCardOptions = createSpecialCardOptions(specialCards);
    const selectedCard = specialCards[selectedCardId];
    const requirements = selectedCard && mobx.toJS(selectedCard.requirements);
    return (
      <div className="AddEditSpecialCard">
        <div className="selection">
          <h3>Select card to edit: </h3>
          <Select
            className="select-container cardSelect"
            classNamePrefix={"select-container"}
            value={selectedOption}
            onChange={this.handleSelectCard}
            options={specialCardOptions}
          />
        </div>

        {!isEditing && (
          <AddSpecialCardForm
            handleAddSpecialCard={this.handleAddSpecialCard}
          />
        )}
        {isEditing && (
          <EditSpecialCardForm
            name={selectedCard.name}
            icon={selectedCard.icon}
            currentImage={selectedCard.icon}
            id={selectedCardId}
            requirements={requirements}
            handleEditSpecialCard={this.handleEditSpecialCard}
            handleCancelEdit={this.handleCancelEdit}
          />
        )}
      </div>
    );
  }
}

export default inject("store")(observer(AddEditSpecialCards));
