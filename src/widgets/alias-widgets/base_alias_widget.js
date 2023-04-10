export default class BaseAliasWidget {
    static WIDGET_HOLDER = null   
    static WIDGET_TYPE = "alias-widget"
    static WIDGET_AUTOFOCUS_FIELD = null

    static create() {
        let widget = this.create_widget()
        widget.appendChild(this.create_content())
        this.append(widget)
        this.autofocus()
    }

    static create_widget() {
        let widget = document.createElement("div");
        widget.classList.add(this.WIDGET_TYPE);
        return widget;
    }

    static append(alias_content) {
        let alias_collection = document.getElementById(this.WIDGET_HOLDER)
        alias_collection.appendChild(alias_content)
    }

    static create_content(){
        throw new Error("Implement method")
    }

    static remove_widget(event){
        let widget = event.target.parentNode.parentNode
        widget.remove()
    }

    static autofocus() {
        if (this.WIDGET_AUTOFOCUS_FIELD== null) {
            return
        }
        document.getElementById(this.WIDGET_AUTOFOCUS_FIELD).focus()
    }
}
