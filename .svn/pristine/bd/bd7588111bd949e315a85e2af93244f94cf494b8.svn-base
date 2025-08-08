import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { StorageAccessFramework } from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import Toast from "react-native-toast-message";
import { Platform, Alert, Linking } from 'react-native';
import { FileCommonService } from '../services/appService/commonFile/common.service';
import { QuanLyFileRequest } from '../services/appService/commonFile';
import MyToastUtils from './toastConfig';

const fileCommonService = FileCommonService.getInstance();

class FileUtils {
  static renderHtmlStyle: any = {
    p: {
      color: '#333333',
      marginBottom: 3,
      marginTop: 0,
      lineHeight: 20
    },
    b: {
      color: '#333333',
      fontWeight: 'normal',
      lineHeight: 20
    },
    strong: {
      color: '#333333',
      fontWeight: 'normal',
      lineHeight: 20
    }
  };

  static async downladFileByName(fileName: string) {
    if (!fileName) return;
    try {
      await this.doDownloadFileAttach(fileName);
    } catch (error) {
      MyToastUtils.show({
        type: 'error',
        text2: 'Không thể tải file. Vui lòng thử lại sau.',
      });
    }
  }

  static containsHtml(text: string): boolean {
    const htmlRegex = /<\/?[a-z][\s\S]*>/i;
    return htmlRegex.test(text);
  }

  static async saveBase64ToFile(base64Data: string, fileName: string) {
    const fileUri = FileSystem.documentDirectory + fileName;  // Đường dẫn tới thư mục tài liệu

    try {
      // Ghi dữ liệu Base64 vào tệp
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Trả về URI của tệp đã tạo
      return fileUri;
    } catch (error) {
      console.error('Error saving file:', error);
      throw error;
    }
  }

  static async loadImage(imageName: string) {
    try {
      const response = await fileCommonService.downloadFileCommon(imageName);
      if (response.data.blob) {
        return { uri: `data:image/jpeg;base64,${response.data.blob}` };
      }
      return require('../accsets/avatarDefault.jpg');
    } catch (error: any) {
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        response: error.response,
      });
      return null;
    }
  }

  static async getBase64(uri: string): Promise<string> {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting to base64:', error);
      throw error;
    }
  }

  static async getArrayBuffer(uri: string): Promise<ArrayBuffer> {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      // Đọc blob thành base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            // Bỏ "data:...;base64," nếu có
            const base64Data = reader.result.split(',')[1];
            resolve(base64Data);
          } else {
            reject('Cannot read file');
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      // Convert base64 -> ArrayBuffer
      const buffer = Buffer.from(base64, 'base64');
      return buffer.buffer;
    } catch (error) {
      console.error('Error converting to ArrayBuffer:', error);
      throw error;
    }
  }

  static async doDownloadFileAttach(fileName: string): Promise<void> {
    try {
      const response = await fileCommonService.downloadFileCommon(fileName);
      if (!response?.data?.blob) {
        MyToastUtils.show({ type: 'error', text2: 'File không tồn tại' });
        return;
      }

      const mimeType = this.getMimeTypeFromFileName(fileName);
      const finalFileName = this.ensureFileExtension(fileName, mimeType);
      const uniqueFileName = await this.getUniqueFileName(finalFileName);
      const fileUri = `${FileSystem.cacheDirectory}${uniqueFileName}`;

      await FileSystem.writeAsStringAsync(fileUri, response.data.blob, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (mimeType === 'application/pdf') {
        await this.handlePdfFile(fileUri);
      } else {
        await this.downloadFile(fileUri, uniqueFileName, mimeType);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      MyToastUtils.show({ type: 'error', text2: 'Không thể tải file' });
      throw error;
    }
  }

  static async doSaveArrayBufferToFile(
    arrayBuffer: ArrayBuffer,
    fileName: string
  ): Promise<void> {
    try {
      if (!arrayBuffer) {
        MyToastUtils.show({ type: 'error', text2: 'Dữ liệu file không tồn tại' });
        return;
      }

      // 1. Chuyển ArrayBuffer → Base64
      const base64String = this.arrayBufferToBase64(arrayBuffer);

      // 2. Xác định mimeType từ fileName
      const mimeType = this.getMimeTypeFromFileName(fileName);
      const finalFileName = this.ensureFileExtension(fileName, mimeType);
      const uniqueFileName = await this.getUniqueFileName(finalFileName);
      const fileUri = `${FileSystem.cacheDirectory}${uniqueFileName}`;

      // 3. Ghi file vào bộ nhớ cache
      await FileSystem.writeAsStringAsync(fileUri, base64String, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 4. Xử lý theo loại file
      if (mimeType === 'application/pdf') {
        await this.handlePdfFile(fileUri);
      } else {
        await this.downloadFile(fileUri, uniqueFileName, mimeType);
      }
    } catch (error) {
      console.error('Error saving file:', error);
      MyToastUtils.show({ type: 'error', text2: 'Không thể lưu file' });
      throw error;
    }
  }

  static async getUniqueFileName(fileName: string): Promise<string> {
    const dir = FileSystem.cacheDirectory;

    const extMatch = fileName.match(/(\.[^.]+)$/);
    const ext = extMatch ? extMatch[1] : '';
    const nameWithoutExt = extMatch ? fileName.replace(ext, '') : fileName;

    let counter = 1;
    let finalName = fileName;
    while (await FileSystem.getInfoAsync(`${dir}${finalName}`).then(info => info.exists)) {
      finalName = `${nameWithoutExt} (${counter})${ext}`;
      counter++;
    }
    return finalName;
  }

  private static async handlePdfFile(fileUri: string): Promise<void> {
    const contentUri = await FileSystem.getContentUriAsync(fileUri);
    try {
      await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: contentUri,
        flags: 1,
        type: 'application/pdf'
      });
    } catch (error) {
      console.error('Error opening PDF:', error);
      Alert.alert('Thông báo', 'Không tìm thấy ứng dụng để mở file PDF');
    }
  }

  public static async downloadFile(fileUri: string, fileName: string, mimeType: string): Promise<void> {
    if (Platform.OS === 'android') {
      const downloadSuccess = await this.handleAndroidDownload(fileUri, fileName, mimeType);
      if (downloadSuccess) {
        MyToastUtils.show({ type: 'success', text2: 'Tải file thành công' });
      }
    } else {
      await Sharing.shareAsync(fileUri);
      MyToastUtils.show({ type: 'success', text2: 'Tải file thành công' });
    }
  }

  private static async handleAndroidDownload(fileUri: string, fileName: string, mimeType: string): Promise<boolean> {
    const directoryUri = await this.getDirectoryPermission();
    if (!directoryUri) {
      MyToastUtils.show({ type: 'error', text2: 'Chưa cấp quyền truy cập thư mục' });
      return false;
    }

    try {
      const destinationUri = await StorageAccessFramework.createFileAsync(directoryUri, fileName, mimeType);
      const content = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await FileSystem.writeAsStringAsync(destinationUri, content, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return true;
    } catch (error) {
      console.error('Error saving file:', error);
      return false;
    }
  }

  private static async getDirectoryPermission(): Promise<string | null> {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    return permissions.granted ? permissions.directoryUri : null;
  }

  static getMimeTypeFromFileName(fileName: string): string {
    const MIME_TYPES: Record<string, string> = {
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif'
    };

    const ext = fileName.toLowerCase().split('.').pop();
    return MIME_TYPES[ext!] || 'application/octet-stream';
  }

  static ensureFileExtension(fileName: string, mimeType: string): string {
    const mimeToExt: Record<string, string> = {
      'application/pdf': '.pdf',
      'application/msword': '.doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
      'application/vnd.ms-excel': '.xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
      'image/png': '.png',
      'image/jpeg': '.jpg',
      'image/gif': '.gif'
    };

    const ext = fileName.toLowerCase().split('.').pop();
    if (ext && Object.values(mimeToExt).some(e => e.substring(1) === ext)) {
      return fileName;
    }

    return `${fileName}${mimeToExt[mimeType] || ''}`;
  }

  static loadListImage = async (
    listData: any[],
    imageField: string,
    listImage: { [key: string]: any },
    setListImage: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>
  ) => {
    try {
      const listDataTemp = listData.map(item => item[imageField]);
      // Get unique images that aren't already loaded
      let uniqueImages = [...new Set(listDataTemp)]
        .filter(imageName => !listImage[imageName || "avatarDefault.jpg"])
        .map(item => item || "avatarDefault.jpg");

      if (uniqueImages.length === 0) return; // Skip if no new images to load

      // Load only new images
      const imagePromises = uniqueImages.map(imageName => FileUtils.loadImage(imageName));
      const loadedImages = await Promise.all(imagePromises);

      // Add new images to existing listImage
      const newImagesObject = uniqueImages.reduce((acc, imageName, index) => ({
        ...acc,
        [imageName]: loadedImages[index]
      }), {});

      setListImage(prev => ({
        ...prev,
        ...newImagesObject
      }));
    } catch (error) {
      // console.error('Error loading images:', error);
    }
  };

  static isImageFile(fileName: string): boolean {
    const typeImages = ["jpg", "jpeg", "png", "gif", "webp"]
    const ext = fileName.toLowerCase().split('.').pop();
    return ext ? typeImages.includes(ext) : false;
  }

  static handleFilePicker = async (
    setFile: React.Dispatch<React.SetStateAction<DocumentPicker.DocumentPickerAsset | null>>
  ) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: false
      });

      if (result.assets && result.assets.length > 0) {
        setFile(result.assets[0]);
      }
    } catch (err) {
      // console.error('Error picking document:', err);
    }
  }

  static handleFilePickerMultiple = async (
    setListFile: React.Dispatch<React.SetStateAction<DocumentPicker.DocumentPickerAsset[]>>
  ) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: true
      });

      if (result.assets && result.assets.length > 0) {
        setListFile(result.assets);
      }
    } catch (err) {
      // console.error('Error picking documents:', err);
    }
  };

  static insertFileCommon = async (
    selectedFile: DocumentPicker.DocumentPickerAsset
  ): Promise<any> => {
    try {
      const base64Data = await FileUtils.getBase64(selectedFile.uri);
      const requestFile = new QuanLyFileRequest();
      requestFile.file = base64Data;
      requestFile.name = selectedFile.name;

      return fileCommonService.insertFileCommon(requestFile);
    } catch (error) {
      // console.error('Error processing file:', error);
    }
  }

  static insertFileCommonWithBase64 = async (
    base64Data: string,
    fileName: string
  ): Promise<any> => {
    try {
      const requestFile = new QuanLyFileRequest();
      requestFile.file = base64Data;
      requestFile.name = fileName;

      return fileCommonService.insertFileCommon(requestFile);
    } catch (error) {
      // console.error('Error processing file:', error);
    }
  }

  public static arrayBufferToBase64(buffer: ArrayBuffer): string {
    return Buffer.from(buffer).toString('base64');
  }
}

export default FileUtils;
