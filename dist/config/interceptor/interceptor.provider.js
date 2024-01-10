"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterceptorProvider = void 0;
const core_1 = require("@nestjs/core");
const response_interceptor_1 = require("../response/response.interceptor");
exports.InterceptorProvider = [
    {
        provide: core_1.APP_INTERCEPTOR,
        useClass: response_interceptor_1.ResponseInterceptor,
    },
];
//# sourceMappingURL=interceptor.provider.js.map