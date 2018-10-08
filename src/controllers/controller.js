import firebase from "../api/firebase.js";
import forOwn from "lodash/forOwn";
import keyBy from "lodash/keyBy";
import sortBy from "lodash/sortBy";

export default class controller {
  constructor(ds) {
    this.ds = ds;
    this.init();

    window.ds = this.ds; // helps with debugging. bad idea, otherwise
  }

  init() {
    const specialCardsRef = firebase.database().ref("specialCards");

    specialCardsRef.on("value", snapshot => {
      let specialCardsRaw = snapshot.val();

      const specialCardsArray = [];
      forOwn(specialCardsRaw, (specialCard, specialCardId) => {
        const { name, icon, requirements } = specialCard;

        specialCardsArray.push({
          id: specialCardId,
          name,
          icon,
          requirements
        });
      });

      const sortedCards = sortBy(specialCardsArray, card => card.name);
      const specialCards = keyBy(sortedCards, "id");
      this.ds.specialCards = specialCards;
    });

    const forgeCardsRef = firebase.database().ref("forgeCards");

    forgeCardsRef.on("value", snapshot => {
      let forgeCardsRaw = snapshot.val();

      const forgeCardsArray = [];
      forOwn(forgeCardsRaw, (forgeCard, forgeCardId) => {
        const { name, icon } = forgeCard;

        forgeCardsArray.push({
          id: forgeCardId,
          name,
          icon
        });
      });
      const sortedCards = sortBy(forgeCardsArray, card => card.name);
      const forgeCards = keyBy(sortedCards, "id");
      this.ds.forgeCards = forgeCards;
    });
  }
}
