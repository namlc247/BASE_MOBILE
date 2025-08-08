import moment from 'moment';

class CalendarUtils {
  static generateWeeks() {
    const weeks: any[] = [];
    const year = new Date().getFullYear();
    let startDate = new Date(year, 0, 1);
    const dayOfWeek = startDate.getDay();
    const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startDate.setDate(startDate.getDate() + offset);

    if (startDate.getFullYear() < year && startDate.getDate() > 28) {
      const tempDate = new Date(year, 0, 1);
      if (tempDate.getDay() >= 4) {
        startDate = new Date(year - 1, 11, 29);
      }
    }

    const endDate = new Date(year, 11, 31);
    const lastDayOfWeek = endDate.getDay();
    if (lastDayOfWeek !== 0) {
      endDate.setDate(endDate.getDate() + (7 - lastDayOfWeek));
    }

    let currentWeek = 1;
    let currentDate = startDate;

    while (currentDate <= endDate && currentWeek < 53) {
      weeks.push({ value: currentWeek, label: `Tuần ${currentWeek}` });
      currentDate.setDate(currentDate.getDate() + 7);
      currentWeek++;
    }

    return weeks;
  }

  static getWeekDates(weekNumber: number, format?: string) {
    const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
    const startDate = new Date(firstDayOfYear);
    startDate.setDate(firstDayOfYear.getDate() + (weekNumber - 1) * 7);
    const diff = startDate.getDay() - 1;
    startDate.setDate(startDate.getDate() - (diff >= 0 ? diff : 6));

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    const formatDate1 = (date: Date) =>
      `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${new Date().getFullYear()}`;

    const formatDateDefault = (date: Date) =>
      `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;

    return format === 'dd/MM/yyyy'
      ? `${formatDate1(startDate)} - ${formatDate1(endDate)}`
      : `${formatDateDefault(startDate)} - ${formatDateDefault(endDate)}`;
  }

  static getWeekNumber(d: Date): number {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

  static getFirstMondayOfYear(year: number): Date {
    let firstDayOfYear = new Date(year, 0, 1);
    const dayOfWeek = firstDayOfYear.getDay();
    const offset = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
    firstDayOfYear.setDate(firstDayOfYear.getDate() + offset);
    return firstDayOfYear;
  }

  static getStartAndEndOfWeek(year: number, weekNumber: number) {
    const firstDayOfYear = new Date(year, 0, 1);
    const startDate = new Date(firstDayOfYear);
    startDate.setDate(firstDayOfYear.getDate() + (weekNumber - 1) * 7);
    const diff = startDate.getDay() - 1;
    startDate.setDate(startDate.getDate() - (diff >= 0 ? diff : 6));

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    return { startDate, endDate };
  }

  static generateDaysArray(startDate: Date, endDate: Date) {
    const days = [];
    const dayNames = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      days.push({
        name: dayNames[dayOfWeek],
        date: `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`,
        weekend: dayOfWeek === 0 || dayOfWeek === 6
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }

  static formatScheduleTimeToHHmm(value: any) {
    return value
      ? new Date(value).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      : '';
  }

  static getPeriodLabel(period: number) {
    const periods: Record<number, string> = { 1: '(CN)', 2: '(S)', 3: '(C)' };
    return periods[period] || '';
  }

  static formatDateToDDMMYYYY(value: any) {
    return value
      ? new Date(value).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
      : '';
  }

  static customFormatDate(value: any, format: string = 'HH:mm DD/MM/YYYY') {
    if (!value || isNaN(new Date(value).getTime())) {
      return "";
    }

    return moment(value).format(format);
  }
}

export default CalendarUtils;
