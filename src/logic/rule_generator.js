export default class RuleGenerator {

    static SEARCH_BAR_PREFIX = "https://www.google.com/search?q=";
    static SEARCH_BAR_SUFFIX = "&";

    static generate(id, alias) {
        let url_filter = RuleGenerator.create_rule_condition(alias.name);
        let rule =  {
            "id": id,
            "priority": 1,
            "action": { "type": "redirect", "redirect": { "url": alias.url } },
            "condition": { "urlFilter": url_filter, "resourceTypes": ["main_frame"] }
        }
        return rule;
    }

    static create_rule_condition(value) {
        return `${RuleGenerator.SEARCH_BAR_PREFIX}${value}${RuleGenerator.SEARCH_BAR_SUFFIX}`;
    }
}
