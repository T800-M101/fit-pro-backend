export class CreateMembershipPlanDto {
  name: string;
  price: number;
  description?: string;
  benefits?: { feature: string; included: boolean }[];
}
