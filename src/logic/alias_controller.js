import RuleGenerator from "/src/logic/rule_generator.js";
import IdTracker from "/src/logic/id_tracker.js";

export default class AliasController {
    static instance = null;
    static ID_KEY = "ALIAS";

    static get_instance(){
        if (AliasController.instance == null){
            AliasController.instance = new AliasController();
        }
        console.log(AliasController.instance);
        return AliasController.instance;
    }

    constructor() {
        this.id_tracker = new IdTracker(AliasController.ID_KEY);
    }

    async create_alias(alias) {
        let id = await this.id_tracker.get_id();
        await this.add_alias(id, alias);
        await this.id_tracker.increment_id();
    }

    async add_alias(id, alias) {
        let rule = RuleGenerator.generate(id, alias);
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
        let aliases = await chrome.declarativeNetRequest.getDynamicRules();
        console.log(aliases);
        return aliases;
    }

    async get_alias_ids() {
        let aliases = await this.get_aliases();
        let ids = []
        for (let alias of aliases) {
            ids.push(alias["id"]);
        }
        return ids;
    }

    async update_alias(id, alias) {
        await this.delete_alias(id)
        await this.add_alias(id, alias)
    }
}
