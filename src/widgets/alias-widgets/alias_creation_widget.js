import Widget from "/src/widgets/widget.js"
import AliasAdditionWidget from "/src/widgets/alias-widgets/alias_addition_widget.js"
import BaseAliasWidget from "/src/widgets/alias-widgets/base_alias_widget.js"

export default class AliasCreationWidget extends BaseAliasWidget{
    static WIDGET_HOLDER = "alias-creation"
    static WIDGET_AUTOFOCUS_FIELD = "creation-button"

    static create_content() {
        let widget_content = Widget.create_form()
        widget_content.appendChild(this.create_add_button());
        return widget_content;
    }

    static create_add_button() {
        let add_button = Widget.create_button()
        add_button.innerText = "+ Create Alias"
        add_button.setAttribute("id", this.WIDGET_AUTOFOCUS_FIELD)
        add_button.addEventListener("click", this.add_button_action);
        return add_button;
    }

    static add_button_action(event) {
        BaseAliasWidget.remove_widget(event)
        AliasAdditionWidget.create()
    }

}