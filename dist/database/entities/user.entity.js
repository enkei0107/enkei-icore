"use strict";
/** @format */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const user_profile_entity_1 = require("./user-profile.entity");
const user_address_entity_1 = require("./user-address.entity");
const user_contact_entity_1 = require("./user-contact.entity");
const user_role_entity_1 = require("./user-role.entity");
let Users = class Users {
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Users.prototype, "login_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "remember_token", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "text" }),
    __metadata("design:type", String)
], Users.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: true,
        transformer: {
            to: (value) => value === undefined ? true : value == 1 ? true : false,
            from: (value) => (value ? 1 : 0),
        },
    }),
    __metadata("design:type", Number)
], Users.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Users.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Users.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_role_entity_1.UserRoles, (userRole) => userRole.user, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", user_role_entity_1.UserRoles)
], Users.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_profile_entity_1.UserProfiles, (profile) => profile.user, {
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
    }),
    __metadata("design:type", user_profile_entity_1.UserProfiles)
], Users.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_address_entity_1.UserAddress, (address) => address.user, {
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
    }),
    __metadata("design:type", user_address_entity_1.UserAddress)
], Users.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_contact_entity_1.UserContacts, (contact) => contact.user, {
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Users.prototype, "contacts", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)()
], Users);
//# sourceMappingURL=user.entity.js.map