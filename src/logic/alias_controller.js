import RuleGenerator from "/src/logic/rule_generator.js";
import IdTracker from "/src/logic/id_tracker.js";
import Alias from "/src/logic/alias.js"

export default class AliasController {
    static instance = null;
    static ID_KEY = "ALIAS";

    static get_instance(){
        if (AliasController.instance == null){
            AliasController.instance = new AliasController();
        }
        return AliasController.instance;
    }

    constructor() {
        this.id_tracker = new IdTracker(AliasController.ID_KEY);
    }

    async create_alias(values) {
        let id = await this.id_tracker.get_id();
        values["id"] = id;
        let alias = Alias.create(values);
        await this.add_alias(alias);
        await this.id_tracker.increment_id();
        return alias;
    }

    async add_alias(alias) {
        let rule = RuleGenerator.generate(alias);
        await chrome.declarativeNetRequest.updateDynamicRules({addRules: [rule]});
    }

    async delete_all_aliases() {
        let alias_ids = await this.get_alias_ids();
        await this.delete_aliases(alias_ids);
    }

    async delete_aliases(ids) {
        await chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: ids});
    }

    async delete_alias(id) {
        await this.delete_aliases([id])
    }

    async get_aliases() {
        let rules = await this.get_alias_rules();
        let aliases = [];
        for (let rule of rules) {
            aliases.push(RuleGenerator.rule_to_alias(rule));
        }
        return aliases;
    }


    async get_alias_rules() {
        let alias_rules = await chrome.declarativeNetRequest.getDynamicRules();
        return alias_rules;
    }

    async get_alias_ids() {
        let alias_rules = await this.get_aliase_rules();
        let ids = []
        for (let rule of alias_rules) {
            ids.push(rule["id"]);
        }
        return ids;
    }

    async update_alias(alias) {
        await this.delete_alias(alias.id)
        await this.add_alias(alias)
    }
}
