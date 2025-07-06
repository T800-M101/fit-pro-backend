import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {

    return handler.handle().pipe(
        map((data: any) => {
            return plainToInstance(UserResponseDto, data, {
                excludeExtraneousValues: true
            });
        }),
    );
  }
}
