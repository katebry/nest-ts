import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform
} from '@nestjs/common';
import {validate} from "class-validator";
import {plainToClassFromExist} from "class-transformer";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value, metadata: ArgumentMetadata) {
        const {metatype} = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            console.log(value)
            return value;
        }
        const object = plainToClassFromExist(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed')
        }
        return value;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find(type => metatype === type)
    }

}