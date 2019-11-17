import { NextFunction, Request, Response, Router } from "express";
import { BaseModel } from "../BaseModel";

export class AdminModel extends BaseModel {
    public GetAllUsers() {
        return [
            {
                StudentID: 1,
                Email: "anish.shenwai1@gmail.com",
                StudentName: "AnishShenwai",
                NotificationLevel: 3,
                AlgorithmAccuracy: 0.5,
                Courses: [1, 2],
                IsAdmin: true,
            },
            {
                StudentID: 2,
                Email: "ashenwai@uvic.ca",
                StudentName: "AShenwai",
                NotificationLevel: 2,
                AlgorithmAccuracy: 1.5,
                Courses: [],
                IsAdmin: false,
            },
            {
                StudentID: 3,
                Email: "admin@uvic.ca",
                StudentName: "admin",
                NotificationLevel: 0,
                AlgorithmAccuracy: 0,
                Courses: [],
                IsAdmin: true,
            },
        ];
    }
    public RemoveUser(userID: number) {
      return [
          {
              StudentID: 2,
              Email: "ashenwai@uvic.ca",
              StudentName: "AShenwai",
              NotificationLevel: 2,
              AlgorithmAccuracy: 1.5,
              Courses: [],
              IsAdmin: false,
          },
          {
              StudentID: 3,
              Email: "admin@uvic.ca",
              StudentName: "admin",
              NotificationLevel: 0,
              AlgorithmAccuracy: 0,
              Courses: [],
              IsAdmin: true,
          },
      ];
    }


    public GetNewID() {
        return [
            {StudenID: 4}
        ];
    }

    public AddUser(newuser:object) {
        return {
            insertedCount: 1,
            ops: [
                {StudentID: 2}
            ]
        };
    }

    public UpdateUser(userID:number, updatedUser:object) {
        return {
            matchedCount: 1
        };
    }

}
