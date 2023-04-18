export default class BaseAliasWidgetGenerator {
    static WIDGET_HOLDER = null   
    static WIDGET_ID = "base-alias-widget"
    static WIDGET_TYPE = "alias-widget"
    static WIDGET_AUTOFOCUS_FIELD = null

    constructor() {}

    create() {
        let widget = this.create_widget()
        widget.appendChild(this.create_content())
        this.append(widget)
        this.autofocus()
    }

    create_widget() {
        let widget = document.createElement("div");
        widget.classList.add(this.constructor.WIDGET_TYPE);
        widget.setAttribute("id", this.constructor.WIDGET_ID)
        return widget;
    }

    append(alias_content) {
        let alias_collection = document.getElementById(this.constructor.WIDGET_HOLDER)
        alias_collection.appendChild(alias_content)
    }

    create_content(){
        throw new Error("Implement method")
    }

    remove_widget(){
        let widget = document.getElementById(this.constructor.WIDGET_ID);
        widget.remove()
    }

    autofocus() {
        console.log(this.constructor.WIDGET_AUTOFOCUS_FIELD)
        if (this.constructor.WIDGET_AUTOFOCUS_FIELD == null) {
            return
        }
        document.getElementById(this.constructor.WIDGET_AUTOFOCUS_FIELD).focus()
    }
}
