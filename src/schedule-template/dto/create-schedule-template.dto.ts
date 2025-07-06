import { ArrayNotEmpty, IsArray, IsInt, IsPositive, IsString } from "class-validator";

export class CreateScheduleTemplateDto {
    @IsInt()
    classId: number;

    @IsInt()
    dayOfWeek: number;

    @IsPositive()
    totalSpots: number;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({each: true})
    startTimes: string[]
}
