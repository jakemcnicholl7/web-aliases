import Widget from "/src/widgets/widget.js"
import BaseAliasWidgetGenerator from "/src/widgets/alias-widgets/base_alias_widget_generator.js"
import Alias from "/src/logic/alias.js"

export default class AliasAdditionWidgetGenerator extends BaseAliasWidgetGenerator{
    static WIDGET_ID = "alias-addition-widget"
    static WIDGET_HOLDER = "alias-addition" 
    static WIDGET_AUTOFOCUS_FIELD = "alias-input-field"

    constructor(alias_controller, alias_widget_generator) {
        super();
        this.controller = alias_controller;
        this.alias_widget_generator = alias_widget_generator;
        this.add_button_action = this.add_button_action.bind(this);
        this.delete_button_action = this.delete_button_action.bind(this);
    }

    create_content() {
        let widget_content = Widget.create_form()
        widget_content.appendChild(this.create_delete_button());
        widget_content.appendChild(this.create_alias_field());
        widget_content.appendChild(this.create_url_field());
        widget_content.appendChild(this.create_add_button());
        return widget_content;
    }

    create_delete_button() {
        let delete_button = Widget.create_button()
        delete_button.innerText = "x"
        delete_button.addEventListener("click", this.delete_button_action);
        return delete_button;
    }

    delete_button_action(event){
        this.remove_widget(event);
    }

    create_add_button() {
        let add_button = Widget.create_button();
        add_button.addEventListener("click", this.add_button_action);
        add_button.innerText = "Add"
        return add_button;
    }

    async add_button_action(event){
        let element = event.target 
        let widget = element.parentNode
        let values = {
            "alias": widget.querySelector(".alias").value,
            "url": widget.querySelector(".url").value,
        }
        this.remove_widget(event);
        let alias = await this.controller.create_alias(values)
        this.alias_widget_generator.create(alias)
    }

    create_alias_field() {
        let element = Widget.create_input();
        element.classList.add("alias")
        element.setAttribute("id", this.constructor.WIDGET_AUTOFOCUS_FIELD)
        element.setAttribute("placeholder","Alias")
        return element
    }

    create_url_field() {
        let element = Widget.create_input();
        element.classList.add("url")
        element.setAttribute("placeholder","URL")
        Widget.add_submission_event(element, this.add_button_action);
        return element
    }
}
