import {ArrayMaxSize, ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsString, Min, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';

export class SeatDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  row: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  seat: number;
}

export class CreateReservationDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Type(() => SeatDto)
  seats: SeatDto[];

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  eventId: number;

  // all seats must be in the same aisle because they must be next to each other
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  aisle: number;

  @IsString()
  @IsNotEmpty()
  venueConfigurationId: string;
}
