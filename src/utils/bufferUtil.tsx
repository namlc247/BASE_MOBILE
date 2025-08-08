import { Buffer } from 'buffer';

class BufferUtil {
  static atobBuffer(base64: string): string {
    return Buffer.from(base64, 'base64').toString('utf-8');
  }

  static btoaBuffer(input: string): string {
    return Buffer.from(input, 'utf-8').toString('base64');
  }
}

export default BufferUtil;
