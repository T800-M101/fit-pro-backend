import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { ClassSchedule } from './entities/class_schedule.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { Class } from '../classes/entities/class.entity';
const dayjs = require('dayjs');

@Injectable()
export class ClassSchedulesService {




// async getScheduleByClassId(classId: number, userId?: number): Promise<any> {
//   const today = dayjs();
//   const currentWeekDays = Array.from({ length: 6 }).map((_, i) => {
//     const day = today.startOf('week').add(i + 1, 'day');
//     return {
//       name: day.format('dddd'),
//       date: day.format('YYYY-MM-DD'),
//     };
//   });

//  const schedules = await this.scheduleRepository.find({
//  where: { class: { id: classId } },
//   relations: ['sessions', 'sessions.bookings'], 
// });

//   const uniqueTimesSet = new Set<string>();
//   schedules.forEach((sch) => {
//     const formattedTime = dayjs(`1970-01-01T${sch.time}`).format('h:mm A');
//     uniqueTimesSet.add(formattedTime);
//   });

//   const defaultTimes = Array.from(uniqueTimesSet).sort((a, b) =>
//     dayjs(a, 'h:mm A').unix() - dayjs(b, 'h:mm A').unix()
//   );

//   const scheduleMap: Record<
//     string,
//     Map<string, { scheduleId: number | null, time: string; availableSpots: number; bookedSpots: number; userBooked: boolean }>
//   > = Object.fromEntries(currentWeekDays.map((day) => [day.name, new Map()]));

//   // Pre-cargar todos los bookings del usuario (si existe)
//   const userBookings = userId
//     ? await this.bookingRepository.find({
//         relations: ['classSession', 'classSession.schedule'],
//         where: {
//           user: { id: userId },
//         },
//       })
//     : [];

//   // Llenar el mapa con los datos por horario
//   for (const schedule of schedules) {
//     const formattedTime = dayjs(`1970-01-01T${schedule.time}`).format('h:mm A');
//     const day = schedule.day_of_week;

//     // Buscar la sesión asociada (puede no existir aún)
//     const session = schedule.sessions?.[0]; // suponiendo 1 sesión por schedule

//     const bookedSpots = session?.bookings?.length || 0;
//     const availableSpots = session ? Math.max(session.available_spots - bookedSpots, 0) : 10;

//     const userBooked = session
//       ? userBookings.some((b) => b.classSession?.id === session.id)
//       : false;

//     if (defaultTimes.includes(formattedTime) && scheduleMap[day]) {
//       scheduleMap[day].set(formattedTime, {
//         scheduleId: schedule.id,
//         time: formattedTime,
//         availableSpots,
//         bookedSpots,
//         userBooked,
//       });
//     }
//   }

//   const result = currentWeekDays.map((dayInfo) => {
//     const hours = defaultTimes.map((time) => {
//       if (scheduleMap[dayInfo.name].has(time)) {
//         return scheduleMap[dayInfo.name].get(time)!;
//       }
//       return {
//         scheduleId: null,
//         time,
//         availableSpots: 10,
//         bookedSpots: 0,
//         userBooked: false,
//       };
//     });

//     return {
//       day: dayInfo.name,
//       date: dayInfo.date,
//       hours,
//     };
//   });

//   return {
//     classId,
//     result,
//     userHasBooking: userBookings.length > 0,
//     message: userBookings.length > 0 ? 'You have already booked this class' : null,
//   };
// }

// async getScheduleByClassId(classId: number, userId?: number): Promise<any> {
//   const today = dayjs();
//   const currentWeekDays = Array.from({ length: 6 }).map((_, i) => {
//     const day = today.startOf('week').add(i + 1, 'day'); // Lunes a Sábado
//     return {
//       name: day.format('dddd'),
//       date: day.format('YYYY-MM-DD'),
//     };
//   });

//   // 1. Get class info
//   const cls = await this.classRepository.findOne({ where: { id: classId } });
//   if (!cls) throw new NotFoundException('Class not found');

//   // 2. Get weekly schedules for this class
// const schedules = await this.scheduleRepository.find({
//  where: { class: { id: classId } },
//   relations: ['classSessions', 'classSessions.bookings'], // Assuming ClassSchedule has 'classSessions' which has 'bookings'
// });

//   // 3. Get class sessions for this class in this week
//   const sessions = await this.sessionRepository.find({
//     where: {
//       class_id: classId,
//       date: Between(
//         currentWeekDays[0].date,
//         currentWeekDays[currentWeekDays.length - 1].date
//       ),
//     },
//     relations: ['bookings'],
//   });

//   // 4. Get user bookings if userId is provided
//   const userBookingSessionIds = new Set<number>();
//   if (userId) {
//     const userBookings = await this.bookingRepository.find({
//       where: { user: { id: userId } },
//       relations: ['classSession'],
//     });
//     userBookings.forEach(b => userBookingSessionIds.add(b.classSession.id));
//   }

//   // 5. Mapeamos los horarios y sesiones
//   const scheduleMap: Record<string, any[]> = {};
//   for (const day of currentWeekDays) {
//     const matchingSchedules = schedules.filter(s => s.day_of_week === day.name);
//     scheduleMap[day.name] = matchingSchedules.map(sched => {
//       // Buscar si hay una sesión real que coincida con este horario y fecha
//       const session = sessions.find(sess =>
//         dayjs(sess.date).format('YYYY-MM-DD') === day.date &&
//         sess.time === sched.time
//       );

//       const timeFormatted = dayjs(`1970-01-01T${sched.time}`).format('h:mm A');
//       const bookedSpots = session?.bookings?.length || 0;
//       const userBooked = session ? userBookingSessionIds.has(session.id) : false;

//       return {
//         time: timeFormatted,
//         scheduleId: sched.id,
//         availableSpots: cls.max_students - bookedSpots,
//         bookedSpots,
//         userBooked,
//       };
//     });
//   }

//   // 6. Construimos el resultado
//   const result = currentWeekDays.map(day => ({
//     day: day.name,
//     date: day.date,
//     hours: scheduleMap[day.name] || [],
//   }));

//   return {
//     classId,
//     result,
//     userHasBooking: userBookingSessionIds.size > 0,
//     message: userBookingSessionIds.size > 0 ? 'You have already booked this class' : null,
//   };
// }



}
