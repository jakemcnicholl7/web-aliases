import Widget from "/src/widgets/widget.js"
import BaseAliasWidgetGenerator from "/src/widgets/alias-widgets/base_alias_widget_generator.js"

export default class AliasWidgetGenerator extends BaseAliasWidgetGenerator{
    static WIDGET_ID = "alias-widget"
    static WIDGET_HOLDER = "alias-collection" 

    constructor(alias_controller){
        super();
        this.controller = alias_controller;
    }

    create(values) {
        let widget = this.create_widget()
        widget.appendChild(this.create_content(values))
        this.append(widget)
        this.delete_button_action = this.delete_button_action.bind(this);
    }

    create_content(values) {
        let widget_content = Widget.create_form()
        widget_content.appendChild(this.create_delete_button());
        widget_content.appendChild(this.add_alias_value(values['alias']));
        widget_content.appendChild(this.add_url_value(values['url']));
        return widget_content;
    }

    create_delete_button() {
        let delete_button = Widget.create_button()
        delete_button.innerText = "X"
        delete_button.addEventListener("click", this.delete_button_action);
        return delete_button;
    }

    delete_button_action(event){
        let element = event.target 
        let widget = element.parentNode.parentNode
        // TODO Remove key values from the database
        widget.remove()
    }

    add_alias_value(value) {
        let element = Widget.create_value();
        element.classList.add("alias")
        element.innerText = "Alias : " + value
        return element
    }

    add_url_value(value) {
        let element = Widget.create_value();
        element.classList.add("url")
        element.innerText = "URL : " + value
        return element
    }
}