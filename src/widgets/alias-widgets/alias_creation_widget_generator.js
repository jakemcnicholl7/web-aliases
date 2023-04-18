import Widget from "/src/widgets/widget.js"
import BaseAliasWidgetGenerator from "/src/widgets/alias-widgets/base_alias_widget_generator.js"

export default class AliasCreationWidgetGenerator extends BaseAliasWidgetGenerator{
    static WIDGET_ID = "alias-creation-widget"
    static WIDGET_HOLDER = "alias-creation"
    static WIDGET_AUTOFOCUS_FIELD = "creation-button"

    constructor(alias_addition_widget_generator) {
        super();
        this.alias_addition_widget_generator = alias_addition_widget_generator;
        this.add_button_action = this.add_button_action.bind(this);
    }

    create_content() {
        let widget_content = Widget.create_form()
        widget_content.appendChild(this.create_add_button());
        return widget_content;
    }

    create_add_button() {
        let add_button = Widget.create_button()
        add_button.innerText = "+ Create Alias"
        add_button.setAttribute("id", this.constructor.WIDGET_AUTOFOCUS_FIELD)
        add_button.addEventListener("click", this.add_button_action);
        return add_button;
    }

    add_button_action() {
        //super.remove_widget(event)
        console.log(this)
        console.log(this.link)
        console.log(this.constructor.alias_addition_widget_generator);
        console.log(this.alias_addition_widget_generator);
        this.alias_addition_widget_generator.create();
    }
}