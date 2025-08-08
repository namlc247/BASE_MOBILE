import moment from 'moment';
import { Buffer } from 'buffer';

class TextUtils {
  static decodeFromBase64Unicode(content: string): string {
    try {
      const decoded = Buffer.from(content, 'base64').toString('utf-8');
      return decoded;
    } catch (e) {
      console.error("Invalid Base64 content:", content);
      return content;
    }
  }

  static encodeToBase64Unicode(content: string): string {
    try {
      const encoded = Buffer.from(content, 'utf-8').toString('base64');
      return encoded;
    } catch (e) {
      console.error("Error encoding to Base64:", content);
      return content;
    }
  }

  static getTimeAgo(lastTimeUpdated: string): string {
    const lastUpdatedMoment = moment(lastTimeUpdated);
    const now = moment();
    const diffInMinutes = now.diff(lastUpdatedMoment, "minutes");

    if (diffInMinutes < 1) {
      return "vừa xong";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 24 * 60) {
      return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    } else if (diffInMinutes < 7 * 24 * 60) {
      return `${Math.floor(diffInMinutes / (24 * 60))} ngày trước`;
    } else if (diffInMinutes < 30 * 24 * 60) {
      return `${Math.floor(diffInMinutes / (7 * 24 * 60))} tuần trước`;
    } else if (diffInMinutes < 365 * 24 * 60) {
      return `${Math.floor(diffInMinutes / (30 * 24 * 60))} tháng trước`;
    } else {
      return `${Math.floor(diffInMinutes / (365 * 24 * 60))} năm trước`;
    }
  }
}

export default TextUtils;
