export default class Widget {
    static create_button() {
        let button = document.createElement("button");
        button.classList.add("button");
        return button;
    }

    static create_input() {
        let element = document.createElement("input")
        element.classList.add("field")
        element.setAttribute("type", "text")
        return element
    }

    static create_form() {
        let widget_content = document.createElement("div");
        widget_content.classList.add("form")
        return widget_content;
    }
    
    static create_value() {
        let value = document.createElement("div");
        value.classList.add("badge");
        return value;
    }

    static add_submission_event(element, method) {
        element.addEventListener("keypress", function(event){
            if (event.key === 'Enter') {
                method(event)
            } 
        })
    }
}