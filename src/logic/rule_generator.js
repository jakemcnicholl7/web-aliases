import UrlGenerator from "/src/logic/url_generator.js";
import Alias from "/src/logic/alias.js"

export default class RuleGenerator {

    static SEARCH_BAR_PREFIX = "https://www.google.com/search?q=";
    static SEARCH_BAR_SUFFIX = "&";

    static generate(alias) {
        let url_filter = RuleGenerator.create_rule_condition(alias.name);
        let rule =  {
            "id": alias.id,
            "priority": 1,
            "action": { "type": "redirect", "redirect": { "url": alias.url } },
            "condition": { "urlFilter": url_filter, "resourceTypes": ["main_frame"] }
        }
        return rule;
    }

    static create_rule_condition(value) {
        let encoded_value = UrlGenerator.encode(value);
        return `${RuleGenerator.SEARCH_BAR_PREFIX}${encoded_value}${RuleGenerator.SEARCH_BAR_SUFFIX}`;
    }

    static rule_to_alias(rule) {
        let id = rule["id"];
        let url = rule["action"]["redirect"]["url"];
        let alias = RuleGenerator.parse_alias(rule["condition"]["urlFilter"]);
        return new Alias(id, alias, url);
    }

    static parse_alias(alias_filter) {
        let start_index = RuleGenerator.SEARCH_BAR_PREFIX.length;
        let end_index = alias_filter.length - RuleGenerator.SEARCH_BAR_SUFFIX.length;
        let encoded_alias = alias_filter.substring(start_index, end_index);
        return UrlGenerator.decode(encoded_alias);
    }
}
