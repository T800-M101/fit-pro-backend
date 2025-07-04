import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { UserDto } from 'src/users/dto/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {

    return handler.handle().pipe(
        map((data: any) => {
            return plainToInstance(UserDto, data, {
                excludeExtraneousValues: true
            });
        }),
    );
  }
}
