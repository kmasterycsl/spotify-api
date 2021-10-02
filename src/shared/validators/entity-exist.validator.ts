import { Injectable } from "@nestjs/common";
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from "class-validator";
import { getManager } from "typeorm";

@ValidatorConstraint({ name: "EntityExists", async: true })
@Injectable()
export class EntityExistValidator implements ValidatorConstraintInterface {
    async validate(value: number, args: ValidationArguments) {
        try {
            const entityManager = getManager();
            await entityManager.findOneOrFail(args.constraints[0], value);
        } catch (e) {
            return false;
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return `Can't find ${args.constraints[0].name || "unknown entity"} with id ${args.value}`;
    }
}
