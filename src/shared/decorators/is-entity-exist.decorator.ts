import { registerDecorator, ValidationOptions } from "class-validator";
import { EntityTarget } from "typeorm";
import { EntityExistValidator } from "../validators/entity-exist.validator";

export function IsEntityExist(entity: EntityTarget<any>, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: "EntityExist",
            target: object.constructor,
            constraints: [entity],
            propertyName: propertyName,
            options: validationOptions,
            validator: EntityExistValidator,
        });
    };
}
