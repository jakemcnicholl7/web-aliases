import AliasCreationWidgetGenerator from "/src/widgets/alias-widgets/alias_creation_widget_generator.js";
import AliasAdditionWidgetGenerator from "/src/widgets/alias-widgets/alias_addition_widget_generator.js";
import AliasWidgetGenerator from "/src/widgets/alias-widgets/alias_widget_generator.js";
import AliasController from "/src/logic/alias_controller.js"



function setup() {
    let alias_controller = new AliasController();

    let alias_widget_generator = new AliasWidgetGenerator(alias_controller);
    let alias_addition_widget_generator = new AliasAdditionWidgetGenerator(alias_controller, alias_widget_generator);
    let alias_creation_widget_generator = new AliasCreationWidgetGenerator(alias_addition_widget_generator);

    alias_creation_widget_generator.create();
}

window.onload = setup 
