import {
  Controller,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadDocInLocalInterceptor } from 'src/uploadfile';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {
  constructor(private doumentService: DocumentService) {}

  @UseInterceptors(UploadDocInLocalInterceptor)
  @Post('resource/:userid')
  uploadfile(
    @Param('userid') userid: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file, '>>');

    return this.doumentService.createDocumentInLocal(userid, file);
  }
  @UseInterceptors(UploadDocInLocalInterceptor)
  @Patch('resource/:userid')
  updateuploadfile(
    @Param('userid') userid: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file, '>>');

    return this.doumentService.updateDocument(userid, file);
  }
}
