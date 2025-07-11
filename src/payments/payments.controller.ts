import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('history')
  async getMyHistory(@Req() req) {
    const userId = Number(req.user.sub ?? req.user.id);  
    console.log('USER ID', userId)
    
    if (!userId || isNaN(userId)) {
    throw new BadRequestException('Invalid user ID');
  }   
    return this.paymentsService.getHistoryForUser(userId);
  }
 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.getUserPayments(+id);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
