import { Logger, NotFoundException } from '@nestjs/common';
import { Document, FilterQuery, Model } from 'mongoose';

export class BaseService<TData, TDoc = Document<TData>> {
  private readonly logger: Logger;
  private readonly _model: Model<TDoc>;

  constructor(model: Model<TDoc>) {
    this.logger = new Logger(model.modelName);
    this._model = model;
  }

  public get model() {
    return this._model;
  }

  public async create(payload: Partial<TData>) {
    try {
      const doc = new this._model(payload);
      await doc.save();
      return doc;
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  public getAll(filters: FilterQuery<TDoc> = {}) {
    try {
      return this._model.find(filters);
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  public get(filters: FilterQuery<TDoc> = {}) {
    try {
      return this._model.findOne(filters);
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  public getById(id: string) {
    try {
      return this._model.findById(id);
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  public async update(
    filters: FilterQuery<TDoc> = {},
    payload: Partial<TData>,
  ) {
    try {
      const doc = await this._model.findOne(filters);
      if (!doc) {
        throw new NotFoundException('The updated resource not found');
      }
      doc.set(payload);
      await doc.save();
      return doc;
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  public async delete(filters: FilterQuery<TDoc> = {}) {
    try {
      const doc = await this._model.findOne(filters);
      if (!doc) {
        throw new NotFoundException('The deleted resource not found');
      }
      await doc.delete();
      return true;
    } catch (e) {
      this.logger.error(e.message);
      return false;
    }
  }
}
