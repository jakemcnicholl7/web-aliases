import Widget from "/src/widgets/widget.js"
import BaseAliasWidget from "/src/widgets/alias-widgets/base_alias_widget.js"
import AliasWidget from "/src/widgets/alias-widgets/alias_widget.js"
import AliasCreationWidget from "/src/widgets/alias-widgets/alias_creation_widget.js"

export default class AliasAdditionWidget extends BaseAliasWidget{
    static WIDGET_HOLDER = "alias-addition" 
    static WIDGET_AUTOFOCUS_FIELD = "alias-input-field"

    static create_content() {
        let widget_content = Widget.create_form()
        widget_content.appendChild(this.create_delete_button());
        widget_content.appendChild(this.create_alias_field());
        widget_content.appendChild(this.create_url_field());
        widget_content.appendChild(this.create_add_button());
        return widget_content;
    }

    static create_delete_button() {
        let delete_button = Widget.create_button()
        delete_button.innerText = "X"
        delete_button.addEventListener("click", this.delete_button_action);
        return delete_button;
    }

    static delete_button_action(event){
        BaseAliasWidget.remove_widget(event)
        AliasCreationWidget.create()
    }

    static create_add_button(event) {
        let add_button = Widget.create_button();
        add_button.addEventListener("click", this.add_button_action);
        add_button.innerText = "Add"
        return add_button;
    }

    static add_button_action(event){
        let element = event.target 
        let widget = element.parentNode
        let values = {
            "alias": widget.querySelector(".alias").value,
            "url": widget.querySelector(".url").value,
        }
        BaseAliasWidget.remove_widget(event)
        AliasWidget.create(values)
        AliasCreationWidget.create()
        // TODO add alias and url to the database
    }

    static create_alias_field() {
        let element = Widget.create_input();
        element.classList.add("alias")
        element.setAttribute("id", this.WIDGET_AUTOFOCUS_FIELD)
        element.setAttribute("placeholder","Alias")
        return element
    }

    static create_url_field() {
        let element = Widget.create_input();
        element.classList.add("url")
        element.setAttribute("placeholder","URL")
        Widget.add_submission_event(element, this.add_button_action);
        return element
    }
}
