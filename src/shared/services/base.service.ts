import {
  Logger,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import {
  Document,
  FilterQuery,
  Model,
  PaginateModel,
  PaginateOptions,
  UpdateQuery,
} from 'mongoose';

interface BaseServiceInitOptions<TDoc> {
  model: Model<TDoc>;
  paginated?: boolean;
}

export class BaseService<TData, TDoc = Document<TData>> {
  private readonly logger: Logger;
  private _model: Model<TDoc>;
  private _paginatedModel: PaginateModel<TDoc>;

  constructor({ model, paginated }: BaseServiceInitOptions<TDoc>) {
    this.logger = new Logger(model.modelName);
    this._model = model;
    if (paginated) {
      this._paginatedModel = model as PaginateModel<TDoc>;
    }
  }

  public get model() {
    return this._model;
  }

  public async paginate(query?: FilterQuery<TDoc>, options?: PaginateOptions) {
    try {
      return this._paginatedModel.paginate(query, options);
    } catch (e) {
      this.logger.error(e.message);
      throw new NotImplementedException();
    }
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

  public update(
    filters: FilterQuery<TDoc> = {},
    updateQuery: UpdateQuery<TDoc> = {},
  ) {
    try {
      return this._model.findOneAndUpdate(filters, updateQuery, {
        new: true,
      });
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  public async delete(filters: FilterQuery<TDoc> = {}) {
    const doc = await this._model.findOne(filters);
    if (!doc) {
      throw new NotFoundException('The deleted resource not found');
    }
    const { deletedCount } = await this._model.deleteOne({ _id: doc._id });
    return deletedCount > 0;
  }
}
