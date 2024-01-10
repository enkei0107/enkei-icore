"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontOfficeModule = exports.AuthController = exports.AuthService = exports.AuthModule = exports.dataSourceOptions = exports.DatabaseModule = void 0;
const database_module_1 = require("./database/database.module");
Object.defineProperty(exports, "DatabaseModule", { enumerable: true, get: function () { return database_module_1.DatabaseModule; } });
const data_source_1 = require("./database/data-source");
Object.defineProperty(exports, "dataSourceOptions", { enumerable: true, get: function () { return data_source_1.dataSourceOptions; } });
const auth_module_1 = require("./front-office/auth/auth.module");
Object.defineProperty(exports, "AuthModule", { enumerable: true, get: function () { return auth_module_1.AuthModule; } });
const auth_service_1 = require("./front-office/auth/auth.service");
Object.defineProperty(exports, "AuthService", { enumerable: true, get: function () { return auth_service_1.AuthService; } });
const auth_controller_1 = require("./front-office/auth/auth.controller");
Object.defineProperty(exports, "AuthController", { enumerable: true, get: function () { return auth_controller_1.AuthController; } });
const front_office_module_1 = require("./front-office/front-office.module");
Object.defineProperty(exports, "FrontOfficeModule", { enumerable: true, get: function () { return front_office_module_1.FrontOfficeModule; } });
//# sourceMappingURL=index.js.map