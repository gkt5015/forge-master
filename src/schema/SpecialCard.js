export default class SpecialCard {
    constructor(name, icon, requirements) {
        this.name = name;
        this.icon = icon;
        this.requirements = requirements;
        this.requirementsPartiallyMet = false;
        this.requirementsFullyMet = false;
        this.missingRequirements = [];
    }
}