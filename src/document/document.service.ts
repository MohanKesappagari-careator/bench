import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extname } from 'path';
import { Repository } from 'typeorm';
import { CreateDocumentInput } from './dto/create-document.input';
import { UpdateDocumentInput } from './dto/update-document.input';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentService {
  updateDocumentInLocal(userid: any, file: Express.Multer.File) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Document)
    private readonly documentRepo: Repository<Document>,
  ) {}
  create(createDocumentInput: CreateDocumentInput) {
    const doc = this.documentRepo.create(createDocumentInput);
    return this.documentRepo.save(doc);
  }

  findAll() {
    return this.documentRepo.find();
  }

  findOne(id: number) {
    return this.documentRepo.findOne(id);
  }

  update(id: number, updateDocumentInput: UpdateDocumentInput) {
    const up = this.documentRepo.create(updateDocumentInput);
    return this.documentRepo.update(id, up);
  }

  remove(id: number) {
    return this.documentRepo.delete(id);
  }
  async createDocumentInLocal(userid: any, file: Express.Multer.File) {
    const FILE = await this.documentRepo.save({
      documenttype: file.mimetype,
      documentname: file.originalname,
      description: file.mimetype,
      fileurl: file.path,
      filename: file.filename,
      fileextension: extname(file.originalname),
      resourceid: userid,
    });
    return FILE;
  }
  async updateDocument(resourceid: any, file: Express.Multer.File) {
    const FIND = await this.documentRepo.findOne({ resourceid });
    const Cr = await this.documentRepo.create({
      documenttype: file.mimetype,
      documentname: file.originalname,
      description: file.mimetype,
      fileurl: file.path,
      filename: file.filename,
      fileextension: extname(file.originalname),
      resourceid: resourceid,
    });
    !FIND
      ? await this.documentRepo.save({
          documenttype: file.mimetype,
          documentname: file.originalname,
          description: file.mimetype,
          fileurl: file.path,
          filename: file.filename,
          fileextension: extname(file.originalname),
          resourceid: resourceid,
        })
      : await this.documentRepo.update(
          {
            resourceid: resourceid,
          },
          Cr,
        );
  }
}
