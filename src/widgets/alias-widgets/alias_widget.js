import Widget from "/src/widgets/widget.js"
import BaseAliasWidget from "/src/widgets/alias-widgets/base_alias_widget.js"
import AliasCreationWidget from "/src/widgets/alias-widgets/alias_creation_widget.js"

export default class AliasWidget extends BaseAliasWidget{
    static WIDGET_HOLDER = "alias-collection" 

    static create(values) {
        let widget = this.create_widget()
        widget.appendChild(this.create_content(values))
        this.append(widget)
    }

    static create_content(values) {
        let widget_content = Widget.create_form()
        widget_content.appendChild(this.create_delete_button());
        widget_content.appendChild(this.add_alias_value(values['alias']));
        widget_content.appendChild(this.add_url_value(values['url']));
        return widget_content;
    }

    static create_delete_button() {
        let delete_button = Widget.create_button()
        delete_button.innerText = "X"
        delete_button.addEventListener("click", this.delete_button_action);
        return delete_button;
    }

    static delete_button_action(event){
        let element = event.target 
        let widget = element.parentNode.parentNode
        // TODO Remove key values from the database
        widget.remove()
    }

    static add_alias_value(value) {
        let element = Widget.create_value();
        element.classList.add("alias")
        element.innerText = "Alias : " + value
        return element
    }

    static add_url_value(value) {
        let element = Widget.create_value();
        element.classList.add("url")
        element.innerText = "URL : " + value
        return element
    }
}