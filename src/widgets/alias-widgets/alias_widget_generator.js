import Widget from "/src/widgets/widget.js"
import BaseAliasWidgetGenerator from "/src/widgets/alias-widgets/base_alias_widget_generator.js"

export default class AliasWidgetGenerator extends BaseAliasWidgetGenerator{
    static WIDGET_ID = "alias-widget"
    static WIDGET_HOLDER = "alias-collection" 
    static ALIAS_ID = "alias-id-value"

    constructor(alias_controller){
        super();
        this.controller = alias_controller;
        this.delete_button_action = this.delete_button_action.bind(this);
    }

    async create_existing_aliases() {
        let aliases = await this.controller.get_aliases();
        for(let alias of aliases) {
            this.create(alias); 
        }
    }

    create(alias) {
        let widget = this.create_widget()
        widget.appendChild(this.create_content(alias))
        this.append(widget)
        this.delete_button_action = this.delete_button_action.bind(this);
    }

    create_content(alias) {
        let widget_content = Widget.create_form()
        widget_content.appendChild(this.create_delete_button());
        widget_content.setAttribute(AliasWidgetGenerator.ALIAS_ID, alias.id);
        console.log(widget_content.getAttribute(AliasWidgetGenerator.ALIAS_ID))
        widget_content.appendChild(this.add_alias_value(alias.name));
        widget_content.appendChild(this.add_url_value(alias.url));
        return widget_content;
    }

    create_delete_button() {
        let delete_button = Widget.create_button()
        delete_button.innerText = "x"
        delete_button.addEventListener("click", this.delete_button_action);
        return delete_button;
    }

    async delete_button_action(event){
        let button = event.target;
        let form = button.parentNode;
        let widget = form.parentNode;
        let id = parseInt(form.getAttribute(AliasWidgetGenerator.ALIAS_ID));
        console.log(id);
        widget.remove();
        await this.controller.delete_alias(id);
    }

    add_alias_value(value) {
        let element = Widget.create_value();
        element.classList.add("alias")
        element.innerText = value
        return element
    }

    add_url_value(value) {
        let element = Widget.create_value();
        element.classList.add("url")
        element.innerText = value
        return element
    }
}