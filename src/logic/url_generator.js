export default class UrlGenerator {
    static SEARCH_PREFIX = "https://www.google.com/search?q=";
    static INVALID_URL_MESSAGE = "Not a valid URL: converting input to a search instead";

    static generate(url) {
        try {
            new URL(url);
            return url;
        } catch (error) {
            console.log(UrlGenerator.INVALID_URL_MESSAGE);
        }
        return UrlGenerator.convert_to_search(url);
    }

    static convert_to_search(text) {
        return UrlGenerator.SEARCH_PREFIX + text.replace(" ", "+");
    }

    static encode(text) {
        return text.replace(" ", "+")
    }

    static decode(text) {
        return text.replace("+", " ") 
    }
}