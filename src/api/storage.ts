import { uid } from '@owlgrid-dev/types';
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';

export interface File {
    id: uid;
    content: Blob;
    uri?: string;
}

export const uploadFiles = async (
    files: File[],
    currentProgress: number,
    iterateProgress: (progress: number) => void,
): Promise<File[]> => {
    const uploadedFiles: File[] = [];
    const numberOfFiles = files.length;

    for (const file of files) {
        const uploadedFile = await uploadFile(
            file,
            currentProgress,
            iterateProgress,
            numberOfFiles,
        );
        uploadedFiles.push(uploadedFile);
    }

    return uploadedFiles;
};

export const uploadFile = async (
    file: File,
    currentProgress: number,
    iterateProgress: (progress: number) => void,
    totalFiles = 1,
): Promise<File> => {
    return new Promise((resolve, reject) => {
        const mediaRef = storageRef(storage, `medias/${file.id}`);
        const uploadTask = uploadBytesResumable(mediaRef, file.content);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                iterateProgress(currentProgress + progress);
            },
            (error) => {
                console.error(error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    file.uri = downloadURL;
                    resolve(file);
                });
            },
        );
    });
};
