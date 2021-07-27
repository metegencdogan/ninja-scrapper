"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ninja = void 0;
class Ninja {
    constructor(name, office, imgUrl) {
        this.name = '';
        this.office = '';
        this.imgUrl = '';
        this.name = name;
        this.office = office;
        this.imgUrl = imgUrl;
    }
    get getName() {
        return this.name;
    }
    get getOffice() {
        return this.office;
    }
    get getImgUrl() {
        return this.imgUrl;
    }
}
exports.Ninja = Ninja;
