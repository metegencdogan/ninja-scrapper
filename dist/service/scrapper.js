"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployees = void 0;
const request_promise_1 = __importDefault(require("request-promise"));
const cheerio_1 = __importDefault(require("cheerio"));
const ninja_1 = require("../model/ninja");
const getEmployees = (nameQuery = '', sort = 'ASC', officeQuery = '') => __awaiter(void 0, void 0, void 0, function* () {
    let employees = [];
    let employee;
    yield request_promise_1.default('https://tretton37.com/meet', (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio_1.default.load(html);
            const info = $('.ninja-summary');
            info.each((i, data) => {
                const office = $(data)
                    .find('.contact-info')
                    .find('h1')
                    .find('a')
                    .find('span')
                    .text();
                const name = $(data)
                    .find('.contact-info')
                    .find('h1')
                    .find('a')
                    .text()
                    .replace(office, '');
                const imgUrl = $(data)
                    .find('a')
                    .find('img')
                    .attr('src');
                employees.push(new ninja_1.Ninja(name, office, imgUrl));
            });
            if (nameQuery != '') {
                employees = filterByName(employees, nameQuery);
            }
            if (officeQuery != '') {
                employees = filterByOffice(employees, officeQuery);
            }
            if (sort == 'DESC') {
                employees.sort((e1, e2) => (e1.getName < e2.getName ? 1 : -1));
            }
        }
    });
    return employees;
});
exports.getEmployees = getEmployees;
const filterByName = (ninjas, name) => {
    return ninjas.filter(ninja => {
        return ninja.getName.includes(name);
    });
};
const filterByOffice = (ninjas, office) => {
    return ninjas.filter(ninja => {
        return ninja.getOffice.includes(office);
    });
};
// module.exports = { getEmployees }
