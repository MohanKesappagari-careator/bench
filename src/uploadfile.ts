import { FileInterceptor } from '@nestjs/platform-express';
import { DocsSize } from './utils/filesize';
import { DocsFileFilter } from './utils/filter';
import { DocsStorage } from './utils/storage';

export const UploadDocInLocalInterceptor = FileInterceptor('docfile', {
  limits: DocsSize,
  storage: DocsStorage,
  fileFilter: DocsFileFilter,
});

// export const UploadDocInAWSInterceptor = FileInterceptor("docfile", {
//   limits: DocsSize,
//   fileFilter: DocsFileFilter,
// });
