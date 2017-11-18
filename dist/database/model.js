"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class BaseModel extends mongoose.Model {
    toJSON() {
        let json = super.toObject();
        if (json._id) {
            json.id = json._id;
            delete json._id;
        }
        if (json.hasOwnProperty('__v')) {
            delete json.__v;
        }
        return json;
    }
}
exports.BaseModel = BaseModel;
class BaseDAO extends BaseModel {
}
exports.BaseDAO = BaseDAO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvZGF0YWJhc2UvbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBcUM7QUFFckMsZUFBZ0MsU0FBUSxRQUFRLENBQUMsS0FBSztJQUVwRCxNQUFNO1FBQ0osSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNsQixDQUFDO1FBQ0QsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2xCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBYkQsOEJBYUM7QUFFRCxhQUE4QixTQUFRLFNBQVM7Q0FDOUM7QUFERCwwQkFDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VNb2RlbCBleHRlbmRzIG1vbmdvb3NlLk1vZGVsIHtcblxuICB0b0pTT04oKSB7XG4gICAgbGV0IGpzb24gPSBzdXBlci50b09iamVjdCgpO1xuICAgIGlmKGpzb24uX2lkKSB7XG4gICAgICBqc29uLmlkID0ganNvbi5faWQ7XG4gICAgICBkZWxldGUganNvbi5faWQ7XG4gICAgfVxuICAgIGlmKGpzb24uaGFzT3duUHJvcGVydHkoJ19fdicpKSB7XG4gICAgICBkZWxldGUganNvbi5fX3Y7XG4gICAgfVxuICAgIHJldHVybiBqc29uO1xuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlREFPIGV4dGVuZHMgQmFzZU1vZGVsIHtcbn0iXX0=