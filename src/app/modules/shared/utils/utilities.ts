import { Guid } from 'guid-typescript';
import { ResponseFiles } from 'src/app/models/common/response.files';
import { BlobStorageService } from 'src/app/services/azure-storage/blob-storage.service';
import { FileInputItem } from '../components/file-input/base';

export class Utilities {
  public static isEmpty(obj) {
    return (obj && (Object.keys(obj).length === 0 || Object.keys(obj) == null));
  }

  public static lowerCaseFirstLetter(word: string) {
    if (!word) {
      return word;
    }
    return word[0].toLowerCase() + word.substr(1);
  }

  public static round(num, decimalPlaces) {
    const p = Math.pow(10, decimalPlaces);
    const e = Number.EPSILON * num * p;
    return Math.round((num * p) + e) / p;
  }

  public static converBase64toBlob(content, contentType) {
    contentType = contentType || '';
    const sliceSize = 512;
    const byteCharacters = window.atob(content); // method which converts base64 to binary
    const byteArrays = [
    ];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {
      type: contentType
    }); // statement which creates the blob
    return blob;
  }

  public static convertBlobToBase64(blob: Blob, type: string) {
    blob = blob.slice(0, blob.size, type);
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  }

  public static capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  public static getUrlfromFile(fileInput: string, blobStorageService: BlobStorageService) {
    const fileInfo: ResponseFiles = JSON.parse(fileInput);
    return blobStorageService.getUrlBlobItem(fileInfo.identifier + '.' + fileInfo.extension, fileInfo.container);
  }

  public static assignParams(obj: any, data: any) {
    const keys = Object.keys(data);
    keys.forEach(key => {
      if (Array.isArray(data[key])) {
        for (const items of obj[key]) {
          this.assignParams(obj[key], data[key]);
        }
      } else if (typeof data[key] === 'object' && data[key] !== null) {
        const keysObj = Object.keys(data[key]);
        this.assignParams(obj[key], data[key]);
      } else {
        obj[key] = data[key];
      }
    });
  }

  public static removeItemOnce(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  public static removeItemAll(arr, value) {
    let i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

  public static async saveImageFormBase64(imageBase64: string, fileInfo: ResponseFiles, extension: string,
    container: string, blobStorageService: BlobStorageService) {
    const block = imageBase64.split(';');
    const contentType = block[0].split(':')[1];
    const realData = block[1].split(',')[1];

    fileInfo = this.createFileInfo(fileInfo, contentType, extension, container);

    const blobbody = Utilities.converBase64toBlob(realData, fileInfo.mediaTypeHeaderValue);
    const itemFile = new File([blobbody], fileInfo.identifier);
    await blobStorageService.uploadBlobItem(itemFile, fileInfo.identifier + '.' + fileInfo.extension, fileInfo.container);
    return fileInfo;
  }

  public static async saveImageFormFile(file: FileInputItem, fileInfo: ResponseFiles, blobStorageService: BlobStorageService) {
    fileInfo = this.createFileInfoWithName(fileInfo, file.name, file.type,  file.name.split('.').pop(), file.container);
    await blobStorageService.uploadBlobItem(file, fileInfo.identifier + '.' + fileInfo.extension, fileInfo.container);
    return fileInfo;
  }

  public static async deleteImageFromBlob(fileInfo: ResponseFiles, container: string, blobStorageService: BlobStorageService) {
    await blobStorageService.deleteBlobItem(fileInfo.identifier + '.' + fileInfo.extension, fileInfo.container);
    return fileInfo;
  }

  public static createFileInfo(fileInfo: ResponseFiles, contentType: string, extension: string, container: string) {
    if (!fileInfo) {
      fileInfo = new ResponseFiles();
      fileInfo.identifier = Guid.create().toString();
    }

    fileInfo.mediaTypeHeaderValue = contentType;
    fileInfo.extension = extension;
    fileInfo.container = container;
    return fileInfo;
  }

  public static createFileInfoWithName(fileInfo: ResponseFiles,name: string,  contentType: string, extension: string, container: string) {
    if (!fileInfo) {
      fileInfo = new ResponseFiles();
      fileInfo.identifier = Guid.create().toString();
    }

    fileInfo.mediaTypeHeaderValue = contentType;
    fileInfo.extension = extension;
    fileInfo.container = container;
    fileInfo.fileName = name;
    return fileInfo;
  }
}
