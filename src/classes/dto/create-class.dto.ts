export class CreateClassDto {
  name: string;
  description: string;
  photo: string;
  durationMinutes: number;
  intensity: 'low' | 'medium' | 'high';
  instructorId: number;  
}


