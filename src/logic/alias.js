export default class Alias {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }

    static create(alias_values) {
        if ("name" in alias_values && "url" in alias_values) {
            return new Alias(alias_values["name"], alias_values["url"])
        }
        throw Error("ERROR: Name and url must be specifed")
    }
}