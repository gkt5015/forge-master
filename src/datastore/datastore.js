import {extendObservable} from "mobx";

export default class datastore {
    constructor() {
        extendObservable(this, {
            forgeCards: [],
            specialCards: [],
        })
    }
}