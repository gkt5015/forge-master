import React from "react";
import AddForgeCardForm from "./AddForgeCardForm";
import EditForgeCardForm from "./EditForgeCardForm";
import Select from "react-select";
import { createForgeCardOptions } from "../../utilities/createForgeCardOptions";
import merge from "lodash/merge";
import addForgeCard from "../../api/addForgeCard";
import editForgeCard from "../../api/editForgeCard";
import keys from "lodash/keys";
import get from "lodash/get";
import { observer, inject } from "mobx-react";

class AddEditForgeCards extends React.Component {
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

  handleAddForgeCard = forgeCard => {
    const { forgeCards } = this.state;
    // doFirbase().then(result => { newForgeCard = { id: result.id, etc } newForgeCards = {...this.state.forgeCards, newForgeCard})
    const forgeCardCount = get(keys(forgeCards), "length", 0);
    const newId = forgeCardCount + 1;
    const { name, icon } = forgeCard;
    const newForgeCard = { [newId]: { name, icon } };
    const newForgeCards = merge({}, forgeCards, newForgeCard);

    this.setState({
      forgeCards: newForgeCards
    });

    return addForgeCard({ name, icon }).then(() => {
      alert(`Added forge card ${name}`);
    });
  };

  handleEditForgeCard = forgeCard => {
    const { forgeCards } = this.state;
    const { id, name, icon } = forgeCard;
    const editedForgeCard = { [id]: { name, icon } };

    const editedForgeCards = merge({}, forgeCards, editedForgeCard);

    this.setState({
      forgeCards: editedForgeCards,
      selectedOption: "",
      isEditing: false
    });

    return editForgeCard({ id, name, icon }).then(() => {
      alert(`Edited forge card ${name}`);
    });
  };

  render() {
    const { store } = this.props;
    const forgeCards = store.forgeCards;

    const { isEditing, selectedOption, selectedCardId } = this.state;
    const forgeCardOptions = createForgeCardOptions(forgeCards);
    const selectedCard = forgeCards[selectedCardId];
    return (
      <div className="AddEditForgeCard">
        <div className="selection">
          <h3>Select card to edit: </h3>
          <Select
            value={selectedOption}
            onChange={this.handleSelectCard}
            options={forgeCardOptions}
            className={"select-container cardSelect "}
            classNamePrefix={"select-container"}
          />
        </div>
        {!isEditing && (
          <AddForgeCardForm handleAddForgeCard={this.handleAddForgeCard} />
        )}
        {isEditing && (
          <EditForgeCardForm
            name={selectedCard.name}
            icon={selectedCard.icon}
            currentImage={selectedCard.icon}
            id={selectedCardId}
            handleEditForgeCard={this.handleEditForgeCard}
            handleCancelEdit={this.handleCancelEdit}
          />
        )}
      </div>
    );
  }
}

export default inject("store")(observer(AddEditForgeCards));
