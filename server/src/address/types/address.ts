import { ApiProperty } from "@nestjs/swagger";

export class Address {
  @ApiProperty()
  id: number;

  @ApiProperty({ nullable: true })
  street: string | null;

  @ApiProperty()
  house: string;

  @ApiProperty({ nullable: true })
  flat: number | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
