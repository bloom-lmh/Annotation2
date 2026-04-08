"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestState;
(function (RequestState) {
    RequestState["Idle"] = "idle";
    RequestState["Loading"] = "loading";
})(RequestState || (RequestState = {}));
class BaseService {
    endpoint;
    cache = new Map();
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
}
class UserService extends BaseService {
    data = '';
    static version = 1;
    loader = async (id) => {
        if (!id) {
            throw new Error('missing id');
        }
        return id;
    };
    constructor(endpoint) {
        super(endpoint);
    }
    map(callback) {
        return {
            data: callback(this.data),
            map(next) {
                return { data: next(callback('')), map: this.map };
            },
        };
    }
    serialize(item) {
        return item.trim();
    }
}
//# sourceMappingURL=feature-coverage.js.map