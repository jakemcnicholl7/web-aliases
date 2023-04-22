export default class IdTracker {
    static INITIAL_ID = 1;

    constructor(id_key) {
        this.id_key = id_key;
    }

    async get_id() {
        let id;
        id =  await this.request_id();
        if (id == null) {
            return await this.initialize_id();
        }
        return id;
    }

    async request_id() {
            let response = await chrome.storage.sync.get([this.id_key]);
            return response[this.id_key];
    }

    async initialize_id() {
        await this.set_id(IdTracker.INITIAL_ID);
        return IdTracker.INITIAL_ID;
    }

    async set_id(value) {
        let storage_request = {};
        storage_request[this.id_key] = value;
        await chrome.storage.sync.set(storage_request);
    }

    async increment_id() {
        let id = await this.get_id();
        this.set_id(id + 1)
    }
}