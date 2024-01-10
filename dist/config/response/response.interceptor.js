"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const zod_1 = require("zod");
let ResponseInterceptor = class ResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.timeout)(15000), (0, rxjs_1.map)((data) => ({
            meta: {
                code: context.switchToHttp().getResponse().statusCode,
                status: 'success',
                message: 'Operation successfully',
            },
            data,
        })), (0, rxjs_1.catchError)((err) => {
            if (err instanceof zod_1.ZodError) {
                const status_code = common_1.HttpStatus.UNPROCESSABLE_ENTITY;
                const message = 'Validation failed';
                const validationErrors = err.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                }));
                return (0, rxjs_1.throwError)(() => {
                    return new common_1.HttpException({
                        meta: {
                            code: status_code,
                            status: 'error',
                            message: message,
                        },
                        data: validationErrors,
                    }, status_code);
                });
            }
            else {
                const status_code = err.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
                const message = err.name || 'Internal Server Error';
                let error = err.message || 'error';
                return (0, rxjs_1.throwError)(() => {
                    return new common_1.HttpException({
                        meta: {
                            code: status_code,
                            status: 'error',
                            message: message,
                        },
                        data: {
                            error: error,
                        },
                    }, status_code);
                });
            }
        }));
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);
//# sourceMappingURL=response.interceptor.js.map