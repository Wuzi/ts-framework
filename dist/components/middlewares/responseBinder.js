"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../helpers/response");
exports.default = (req, res, next) => {
    res.error = response_1.default.error(res);
    res.success = response_1.default.success(res);
    next();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2VCaW5kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvY29tcG9uZW50cy9taWRkbGV3YXJlcy9yZXNwb25zZUJpbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUEyQztBQUUzQyxrQkFBZSxDQUFDLEdBQVEsRUFBRSxHQUFRLEVBQUUsSUFBYyxFQUFFLEVBQUU7SUFDcEQsR0FBRyxDQUFDLEtBQUssR0FBRyxrQkFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxHQUFHLENBQUMsT0FBTyxHQUFHLGtCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLElBQUksRUFBRSxDQUFDO0FBQ1QsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlc3BvbnNlIGZyb20gJy4uL2hlbHBlcnMvcmVzcG9uc2UnO1xuXG5leHBvcnQgZGVmYXVsdCAocmVxOiBhbnksIHJlczogYW55LCBuZXh0OiBGdW5jdGlvbikgPT4ge1xuICByZXMuZXJyb3IgPSByZXNwb25zZS5lcnJvcihyZXMpO1xuICByZXMuc3VjY2VzcyA9IHJlc3BvbnNlLnN1Y2Nlc3MocmVzKTtcbiAgbmV4dCgpO1xufTtcbiJdfQ==