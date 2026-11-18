import type { LibraryExample } from '../../types';
import { FileDropzone } from './FileDropzone';
import { fileDropzoneSpecs } from './specs';

export const fileDropzone: LibraryExample = {
  id: 'file-dropzone',
  platform: 'elements',
  name: 'File dropzone',
  kind: 'Upload',
  category: 'Forms',
  size: 'wide',
  inspiredBy: ['Dropbox', 'Google Drive', 'Linear'],
  description:
    'A dashed drop area beside the list of uploads: a dragged file lights the zone up, a dropped one gets a row whose progress bar and size count up to a check, and a file over the limit is turned away with the reason.',
  Component: FileDropzone,
  specs: fileDropzoneSpecs,
};
